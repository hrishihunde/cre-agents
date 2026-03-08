import {
  EVMClient,
  handler,
  ConfidentialHTTPClient,
  Runner,
  decodeJson,
  type Runtime,
} from "@chainlink/cre-sdk";
import {
  X402Agent,
  type DecodedLog,
  type ServiceRequestedDecoded,
} from "./contracts/evm/ts/generated/X402Agent";

type Config = {
  facilitator_verify_url: string;
  chain_selector: number;
  contract_address: `0x${string}`;
};

const onLogTrigger = (runtime: Runtime<Config>, log: DecodedLog<ServiceRequestedDecoded>): Record<string, never> => {
  const event = log.data;
  const confidentialClient = new ConfidentialHTTPClient();

  // STEP 1: x402 Proof Verification
  // ConfidentialHTTPClient automatically handles DON consensus.
  const verifyRes = confidentialClient.sendRequest(runtime, {
    vaultDonSecrets: [],
    request: {
      url: runtime.config.facilitator_verify_url,
      method: "POST",
      multiHeaders: { "Content-Type": { values: ["application/json"] } },
      bodyString: JSON.stringify({ paymentProof: event.paymentPayload }),
      encryptOutput: false
    }
  }).result();

  if (verifyRes.statusCode !== 200) {
    return {};
  }

  // STEP 2: Execute Resource
  const serviceRes = confidentialClient.sendRequest(runtime, {
    vaultDonSecrets: [],
    request: {
      url: event.serviceUrl,
      method: "GET",
      multiHeaders: {
        "X-X402-Payment-Proof": { values: [event.paymentPayload] }
      },
      encryptOutput: false
    }
  }).result();
  
  if (serviceRes.statusCode >= 400) {
    return {};
  }

  let resultData = "x402 Execution Fulfilled";
  try {
    resultData = decodeJson(serviceRes.body) as string;
  } catch {
    resultData = new TextDecoder().decode(serviceRes.body);
  }

  // STEP 3: On-Chain Fulfillment
  const evmClient = new EVMClient(BigInt(runtime.config.chain_selector));
  const agentContract = new X402Agent(evmClient, runtime.config.contract_address);
  
  agentContract.writeReportFromFulfillService(
    runtime,
    event.agent,
    resultData
  );

  return {};
};

const initWorkflow = (config: Config) => {
  const evmClient = new EVMClient(BigInt(config.chain_selector));
  const agentContract = new X402Agent(evmClient, config.contract_address);

  return [
    handler(
      agentContract.logTriggerServiceRequested(),
      onLogTrigger
    ),
  ];
};

export async function main() {
  const runner = await Runner.newRunner<Config>();
  await runner.run(initWorkflow);
}

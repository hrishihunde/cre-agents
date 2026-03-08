// Code generated — DO NOT EDIT.
import {
  decodeEventLog,
  decodeFunctionResult,
  encodeEventTopics,
  encodeFunctionData,
  zeroAddress,
} from 'viem'
import type { Address, Hex } from 'viem'
import {
  bytesToHex,
  encodeCallMsg,
  EVMClient,
  hexToBase64,
  LAST_FINALIZED_BLOCK_NUMBER,
  prepareReportRequest,
  type EVMLog,
  type Runtime,
} from '@chainlink/cre-sdk'

export interface DecodedLog<T> extends Omit<EVMLog, 'data'> { data: T }





/**
 * Filter params for ServiceRequested. Only indexed fields can be used for filtering.
 * Indexed string/bytes must be passed as keccak256 hash (Hex).
 */
export type ServiceRequestedTopics = {
  agent?: `0x${string}`
}

/**
 * Decoded ServiceRequested event data.
 */
export type ServiceRequestedDecoded = {
  agent: `0x${string}`
  serviceUrl: string
  paymentPayload: string
}


export const X402-agentABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"string","name":"serviceUrl","type":"string"},{"indexed":false,"internalType":"string","name":"paymentPayload","type":"string"}],"name":"ServiceRequested","type":"event"},{"inputs":[{"internalType":"address","name":"agent","type":"address"},{"internalType":"string","name":"resultData","type":"string"}],"name":"fulfillService","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const

export class X402-agent {
  constructor(
    private readonly client: EVMClient,
    public readonly address: Address,
  ) {}

  writeReportFromFulfillService(
    runtime: Runtime<unknown>,
    agent: `0x${string}`,
    resultData: string,
    gasConfig?: { gasLimit?: string },
  ) {
    const callData = encodeFunctionData({
      abi: X402-agentABI,
      functionName: 'fulfillService' as const,
      args: [agent, resultData],
    })

    const reportResponse = runtime
      .report(prepareReportRequest(callData))
      .result()

    return this.client
      .writeReport(runtime, {
        receiver: this.address,
        report: reportResponse,
        gasConfig,
      })
      .result()
  }

  writeReport(
    runtime: Runtime<unknown>,
    callData: Hex,
    gasConfig?: { gasLimit?: string },
  ) {
    const reportResponse = runtime
      .report(prepareReportRequest(callData))
      .result()

    return this.client
      .writeReport(runtime, {
        receiver: this.address,
        report: reportResponse,
        gasConfig,
      })
      .result()
  }

  /**
   * Creates a log trigger for ServiceRequested events.
   * The returned trigger's adapt method decodes the raw log into ServiceRequestedDecoded,
   * so the handler receives typed event data directly.
   * When multiple filters are provided, topic values are merged with OR semantics (match any).
   */
  logTriggerServiceRequested(
    filters?: ServiceRequestedTopics[],
  ) {
    let topics: { values: string[] }[]
    if (!filters || filters.length === 0) {
      const encoded = encodeEventTopics({
        abi: X402-agentABI,
        eventName: 'ServiceRequested' as const,
      })
      topics = encoded.map((t) => ({ values: [hexToBase64(t)] }))
    } else if (filters.length === 1) {
      const f = filters[0]
      const args = {
        agent: f.agent,
      }
      const encoded = encodeEventTopics({
        abi: X402-agentABI,
        eventName: 'ServiceRequested' as const,
        args,
      })
      topics = encoded.map((t) => ({ values: [hexToBase64(t)] }))
    } else {
      const allEncoded = filters.map((f) => {
        const args = {
          agent: f.agent,
        }
        return encodeEventTopics({
          abi: X402-agentABI,
          eventName: 'ServiceRequested' as const,
          args,
        })
      })
      topics = allEncoded[0].map((_, i) => ({
        values: [...new Set(allEncoded.map((row) => hexToBase64(row[i])))],
      }))
    }
    const baseTrigger = this.client.logTrigger({
      addresses: [hexToBase64(this.address)],
      topics,
    })
    const contract = this
    return {
      capabilityId: () => baseTrigger.capabilityId(),
      method: () => baseTrigger.method(),
      outputSchema: () => baseTrigger.outputSchema(),
      configAsAny: () => baseTrigger.configAsAny(),
      adapt: (rawOutput: EVMLog): DecodedLog<ServiceRequestedDecoded> => contract.decodeServiceRequested(rawOutput),
    }
  }

  /**
   * Decodes a log into ServiceRequested data, preserving all log metadata.
   */
  decodeServiceRequested(log: EVMLog): DecodedLog<ServiceRequestedDecoded> {
    const decoded = decodeEventLog({
      abi: X402-agentABI,
      data: bytesToHex(log.data),
      topics: log.topics.map((t) => bytesToHex(t)) as readonly Hex[],
    })
    const { data: _, ...rest } = log
    return { ...rest, data: decoded.args as unknown as ServiceRequestedDecoded }
  }
}


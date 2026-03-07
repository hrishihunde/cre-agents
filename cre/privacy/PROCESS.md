# CRE Privacy Workflow Process Guide

This document explains how to build, test, and interact with the Chainlink CRE privacy workflow.

## 1. Environment Setup
The project uses `bun` as the preferred package manager and runner.
Ensure you have the required dependencies installed:
```bash
cd workflow
bun install
```

> **Note:** The CRE SDK uses a WebAssembly engine (Javy) under the hood. The `bun install` step automatically downloads the required Javy binary for your platform via the `cre-setup` post-install script.

## 2. Type Checking & Compilation (Build)

Before deploying or simulating, you must compile the TypeScript workflow into a `.wasm` file.

**Step 1: Type Checking**
To check for any TypeScript errors without compiling:
```bash
cd workflow
bun x tsc --noEmit
```

**Step 2: WASM Compilation**
To compile the `main.ts` file into the required WebAssembly format (`main.wasm`):
```bash
cd workflow
bun x cre-compile main.ts
```
*If this fails, ensure the post-install script ran successfully to download the Javy plugin.*

## 3. Local Simulation (Testing)

You can locally simulate the execution of the workflow using the CRE CLI simulator.

**Step 1: Create a Test Payload (if you don't have x402 payload)**
Since this workflow expects an HTTP Trigger (with a JSON body), create a temporary `payload.json` file in the `workflow` directory with the following content:

```json
{
  "service_target": "https://echo.free.beeceptor.com",
  "method": "POST",
  "queryParameters": {
    "test": true
  },
  "paymentPayload": "test_payment_payload"
}
```

**Step 2: Run the Simulator**
Execute the `cre workflow simulate` command. We apply the `staging-settings` to use the Sepolia testnet configuration defined in `project.yaml`. 

```bash
cd workflow
cre workflow simulate . -T staging-settings --http-payload payload.json
```

If you face input parsing errors in Windows PowerShell, you can alternatively use standard input by running the simulator interactively:
```bash
cre workflow simulate . -T staging-settings
```
When prompted for the HTTP trigger configuration, simply paste the raw JSON string and push Enter.

## 4. Key Implementation Details

- **Confidential HTTP:** The workflow uses `ConfidentialHTTPClient` from `@chainlink/cre-sdk`. This allows the workflow to make requests to the requested `service_target` while running inside a secure enclave on the Decentralized Oracle Network, keeping the request parameters and data private.
- **x402 Verification:** Before making the confidential request, the workflow performs a standard HTTP check against the payment facilitator to verify the `paymentPayload`.
- **Zod Validation:** The workflow strictly validates the payload layout using `zod`. We specifically use `.startsWith("http")` over `.url()` to maintain compatibility with the Javy WASM execution engine.

# 🤖 Agents of Truth

> **AI agents pay per API call with crypto, while creators' keys stay private — no accounts, no leaks, no middlemen.**

Built at **Convergence | A Chainlink Hackathon** · Team Zugzwang

[![Live Demo](https://img.shields.io/badge/Live-agents--of--truth.com-C2522B?style=for-the-badge)](https://agents-of-truth.com/)
[![GitHub](https://img.shields.io/badge/GitHub-hrishihunde%2Fcre--agents--of--truth-1a1a1a?style=for-the-badge&logo=github)](https://github.com/hrishihunde/cre-agents-of-truth)
[![Built with CRE](https://img.shields.io/badge/Chainlink-CRE-375BD2?style=for-the-badge)](https://chain.link/chainlink-runtime-environment)
[![x402](https://img.shields.io/badge/Protocol-x402-C2522B?style=for-the-badge)](https://x402.org)

---

## The Problem

Today's AI agent ecosystem has three compounding failures:

| Problem | Reality |
|---|---|
| 🔒 **Platform lock-in** | Skills and connectors are tied to specific platforms. No open, agent-to-agent marketplace. |
| 💀 **API key exposure** | Creators hand their keys to middleware servers — in plaintext, on someone else's infrastructure. One breach, everything leaks. |
| 💸 **Subscription overkill** | $29/mo plans for $0.005 of actual usage. No infrastructure for per-call microtransactions. |

---

## The Solution

**Agents of Truth** combines two technologies that solve both sides of the problem simultaneously:

```
x402 protocol  →  open, per-call payments for agents (no accounts)
CRE + Vault DON →  creator API keys never exposed, even to Chainlink nodes
```

### How It Works End-to-End

```
AI Agent
  → POST /v1/skill/analyze
  ← 402 Payment Required (0.001 USDC on Base)
  → Retry with EIP-3009 signed X-PAYMENT header
      → Facilitator verifies proof on-chain
      → USDC settles on Base L2 (~2 seconds)
  → x402 gateway fires JWT-signed CRE trigger
      → Workflow DON spins up (all nodes run main.wasm in parallel)
      → Vault DON provides threshold-decrypted secret → Secure Enclave (TEE)
      → Creator's API key used inside enclave — never leaves in plaintext
      → Result written on-chain via EVMClient (BFT consensus)
      → Secret discarded immediately
  ← 200 OK + result returned to agent
```

---

## Architecture

```
┌──────────────┐     HTTP 402      ┌──────────────────┐
│   AI Agent   │ ────────────────► │  x402 Gateway    │
│  (any chain) │ ◄──────────────── │  (Express + EIP- │
└──────────────┘   200 OK + data   │   3009 verify)   │
                                   └────────┬─────────┘
                                            │ JWT-signed trigger
                                            ▼
                               ┌────────────────────────┐
                               │   Chainlink CRE        │
                               │   Workflow DON         │
                               │                        │
                               │  1. Verify x402 proof  │
                               │  2. getSecret() ───►   │◄── Vault DON
                               │  3. ConfidentialHTTP   │    (threshold
                               │  4. writeReport() ──►  │     encrypted)
                               └────────────────────────┘
                                            │
                                            ▼
                               ┌────────────────────────┐
                               │  X402Agent.sol         │
                               │  (Ethereum Sepolia)    │
                               │  fulfillService()      │
                               └────────────────────────┘
```

---

## Key Components

### ⚡ x402 — Atomic Per-Call Payments

Add micropayments to any API in 3 lines:

```typescript
app.use(paymentMiddleware(WALLET_ADDRESS, {
  "POST /v1/skill/analyze": { price: "$0.001", network: "base-sepolia" },
}));
```

- Agent pays **0.001 USDC** per HTTP call
- No account, no subscription, no registration
- Built on **EIP-3009** signed USDC transfers
- Settled on **Base L2** in ~2 seconds

### 🔒 CRE Confidential HTTP — Zero-Knowledge API Keys

Creator API keys are threshold-encrypted across the Vault DON — no single node ever holds the full key:

```typescript
const confidentialClient = new ConfidentialHTTPClient();

// Secret retrieved from Vault DON → used inside TEE enclave → discarded
const result = confidentialClient.sendRequest(runtime, {
  vaultDonSecrets: [{ key: "CREATOR_API_KEY", version: 1 }],
  request: {
    url: req.resource_url,
    encryptOutput: true,   // response encrypted before leaving enclave
  }
}).result();
```

**What this guarantees:**
- 🔑 Key split via **Chainlink DKG** across N vault nodes
- 🛡️ Decryption shares assembled only inside a **Secure Enclave (TEE)**
- 📡 API call made via **Confidential HTTP** — key never in plaintext on any wire
- 🗑️ Secret **discarded immediately** after execution
- 🔍 Result is auditable on-chain — without revealing any credential

### ⛓️ On-Chain Settlement — X402Agent Contract

```solidity
event ServiceRequested(
    address indexed agent,
    string serviceUrl,
    string paymentPayload
);

function fulfillService(address agent, string calldata resultData) external;
```

The CRE workflow listens for `ServiceRequested` log events, executes the confidential request, and writes results back via `fulfillService()` — all verified by BFT consensus across DON nodes.

---

## Project Structure

```
cre/
├── execution/              # EVM log-triggered workflow
│   ├── workflow/
│   │   ├── main.ts         # Core workflow: verify → fetch → fulfill
│   │   ├── config.staging.json
│   │   ├── config.production.json
│   │   └── contracts/evm/  # Generated X402Agent bindings
│   ├── project.yaml        # CRE CLI config (Sepolia RPC)
│   └── secrets.yaml        # Vault DON secret declarations
│
└── privacy/                # HTTP-triggered confidential workflow
    ├── workflow/
    │   ├── main.ts         # x402 verify → ConfidentialHTTP → return
    │   ├── config.staging.json
    │   └── config.production.json
    ├── project.yaml
    └── test-payload.json
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) — package manager and runtime
- [CRE CLI](https://chain.link/chainlink-runtime-environment) — Chainlink workflow tooling
- A funded wallet on Base Sepolia (for x402 payments)

### 1. Install dependencies

```bash
cd cre/execution/workflow && bun install
# or
cd cre/privacy/workflow && bun install
```

> `bun install` automatically runs `cre-setup` to download the Javy WASM plugin for your platform.

### 2. Configure environment

```bash
# .env
CRE_ETH_PRIVATE_KEY=your_private_key_here
```

### 3. Simulate locally

```bash
# Execution workflow (EVM log trigger)
cre workflow simulate ./cre/execution/workflow --target=staging-settings

# Privacy workflow (HTTP trigger)
cd cre/privacy/workflow
cre workflow simulate . -T staging-settings --http-payload ../test-payload.json
```

Simulation compiles to WASM and makes real calls to live APIs and public EVM nodes — what you see locally is what runs on the DON.

### 4. Deploy

```bash
cre workflow deploy ./cre/execution/workflow --target=production-settings
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Agent payments | [x402 Protocol](https://x402.org) + `@x402/express` |
| Payment signing | EIP-3009 (gasless USDC transfer authorization) |
| Settlement chain | Base Sepolia (L2) |
| Workflow runtime | Chainlink CRE SDK (`@chainlink/cre-sdk`) |
| Execution target | WebAssembly via Javy compiler |
| Secret management | Vault DON + Chainlink DKG (threshold encryption) |
| Private HTTP | CRE `ConfidentialHTTPClient` (TEE enclave) |
| On-chain writes | `EVMClient` + Keystone Forwarder (BFT consensus) |
| Contract bindings | Code-generated from ABI via `cre-setup` |
| Language | TypeScript (compiled to WASM) |

---

## Why This Matters

The agent economy needs a trustless payment and privacy layer. Without it:

- Creators can't monetize skills without exposing credentials
- Agents can't access skills without platform accounts
- There's no open, composable marketplace between agents

**Agents of Truth** demonstrates that both problems are solvable today — with x402 handling open access and CRE's Confidential HTTP handling private execution. The result is a system where creators earn per call without leaking keys, and agents pay per call without needing accounts.

> *Private by design. Auditable by default. Paid per call.*

---

## Team

**Team Zugzwang** — Convergence | A Chainlink Hackathon

---

## Links

- 🌐 **Live:** [agents-of-truth.com](https://agents-of-truth.com/)
- 📖 **CRE Docs:** [docs.chain.link/cre](https://docs.chain.link/cre)
- ⚡ **x402 Protocol:** [x402.org](https://x402.org)
- 🔗 **Chainlink Confidential Compute:** [blog.chain.link/chainlink-confidential-compute](https://blog.chain.link/chainlink-confidential-compute/)

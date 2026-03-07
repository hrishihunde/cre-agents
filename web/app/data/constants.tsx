import React from 'react';
import { StepData, ModalData } from '../types';

export const MODALS: Record<string, ModalData> = {
    agent: {
        title: "🤖  AI Agent — Consumer",
        body: (
            <>
                <h4 className="text-t0 text-[10px] font-bold mb-[3px] tracking-[0.3px] uppercase font-mono">Role</h4>
                <p className="mb-[7px]">Any autonomous agent, LLM, or application that needs to invoke a skill published on the AgentToll marketplace — Claude, a custom GPT, or a headless agent script.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">What it does</h4>
                <p className="mb-[7px]">Makes a standard HTTP POST to a skill endpoint. Receives <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">402 Payment Required</code>. Pays the requested USDC amount on Base Sepolia (~2 sec finality). Receives the result.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">What it does NOT need</h4>
                <p className="mb-[7px]">No API key, no account, no subscription. Payment <em>is</em> the authentication. The agent never learns the creator's credentials.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Tags</h4>
                <p className="mb-[7px]">
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">x402</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">HTTP</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">USDC</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Base L2</span>
                </p>
            </>
        )
    },
    gateway: {
        title: "⚡  x402 Gateway — Payment Verifier",
        body: (
            <>
                <h4 className="text-t0 text-[10px] font-bold mb-[3px] tracking-[0.3px] uppercase font-mono">Role</h4>
                <p className="mb-[7px]">Sits between the AI Agent and the CRE workflow. Enforces the payment protocol, validates on-chain USDC payments, and fires the CRE trigger once payment is confirmed.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Step 1 — 402 Response</h4>
                <p className="mb-[7px]">When an agent calls without a payment header, the gateway returns <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">HTTP 402 Payment Required</code> with the payment details: amount, token address, recipient, and network.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Step 2 — Verify & Trigger</h4>
                <p className="mb-[7px]">After on-chain confirmation, the gateway constructs a JWT-signed request (with SHA256 digest and <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">iss</code> field) and POSTs it to the CRE HTTP trigger endpoint to start the workflow.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Security</h4>
                <p className="mb-[7px]">JWTs expire after 5 minutes and carry a unique <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">jti</code> to prevent replay attacks. Only pre-authorised gateway public keys can trigger the workflow.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Tags</h4>
                <p className="mb-[7px]">
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">x402</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">JWT</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">ECDSA</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">SHA256</span>
                </p>
            </>
        )
    },
    chain: {
        title: "🔗  Base Sepolia — L2 Settlement Layer",
        body: (
            <>
                <h4 className="text-t0 text-[10px] font-bold mb-[3px] tracking-[0.3px] uppercase font-mono">Role</h4>
                <p className="mb-[7px]">The Layer 2 blockchain where payments are made and on-chain results are written. Fast (~2 sec), cheap, and EVM-compatible.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Step 1 — Payment</h4>
                <p className="mb-[7px]">The AI Agent sends <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">0.001 USDC</code> to the gateway's address. The gateway uses the x402 facilitator to verify this transfer before proceeding.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Step 6 — On-chain Write</h4>
                <p className="mb-[7px]">Results from the CRE DON are written via the <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">KeystoneForwarder</code> contract, which verifies a quorum of CRE node signatures before calling <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">onReport()</code> on your skill registry.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Step 7 — Creator Payment</h4>
                <p className="mb-[7px]">A USDC transfer is sent atomically to the creator's wallet, completing the per-call payment cycle.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Tags</h4>
                <p className="mb-[7px]">
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Base L2</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">USDC</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">EIP-3009</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Forwarder</span>
                </p>
            </>
        )
    },
    cre: {
        title: "⚙️  CRE Workflow — Decentralised Execution",
        body: (
            <>
                <h4 className="text-t0 text-[10px] font-bold mb-[3px] tracking-[0.3px] uppercase font-mono">Role</h4>
                <p className="mb-[7px]">The Chainlink Runtime Environment (CRE) is a decentralised off-chain execution engine. Your handler runs in parallel across multiple independent nodes in a DON (Distributed Oracle Network).</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">How it works</h4>
                <p className="mb-[7px]">Every step — fetching secrets, making HTTP calls, writing to chain — is executed by <strong>all nodes simultaneously</strong>. Results are compared via BFT consensus before any output is accepted.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Why it matters</h4>
                <p className="mb-[7px]">No single node can tamper with the result. If one node fails or is compromised, the majority still reaches the correct answer — giving off-chain logic the security of on-chain code.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">handler.ts</h4>
                <p className="mb-[7px]">Your workflow is a single TypeScript file compiled to WASM. It uses <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">ctx.httpClient</code>, <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">ctx.evmClient</code>, and <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">runtime.getSecret()</code> — all consensus-backed capabilities.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Tags</h4>
                <p className="mb-[7px]">
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">DON</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">BFT Consensus</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">WASM</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Chainlink CRE</span>
                </p>
            </>
        )
    },
    vault: {
        title: "🔐  Vault DON — Threshold Encryption",
        body: (
            <>
                <h4 className="text-t0 text-[10px] font-bold mb-[3px] tracking-[0.3px] uppercase font-mono">Role</h4>
                <p className="mb-[7px]">A separate decentralised network that stores and retrieves encrypted secrets at runtime. Uses Chainlink's DKG (Distributed Key Generation) for threshold encryption — the privacy core of the project.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">How getSecret() works</h4>
                <p className="mb-[7px]">When the workflow calls <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">runtime.getSecret({'{'} id: 'CREATOR_API_KEY' {'}'})</code>, each Vault node supplies a <strong>partial decryption share</strong>. The CRE reassembles the plaintext only after a quorum of shares is collected.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Why it's private</h4>
                <p className="mb-[7px]">No single Vault node holds the complete key. Even if one node is compromised, an attacker gets only an unusable partial share. The key is assembled in memory, used once, never logged, never on-chain.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Creator trust model</h4>
                <p className="mb-[7px]">A creator deposits their API key into the Vault. It can never be extracted by any agent, operator, or third party — only used by the CRE workflow under the creator's configured conditions.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Tags</h4>
                <p className="mb-[7px]">
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">DKG</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Threshold Enc.</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Vault DON</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Chainlink</span>
                </p>
            </>
        )
    },
    api: {
        title: "🌐  Skill API — Creator Endpoint",
        body: (
            <>
                <h4 className="text-t0 text-[10px] font-bold mb-[3px] tracking-[0.3px] uppercase font-mono">Role</h4>
                <p className="mb-[7px]">The creator's actual backend — the HTTP service that powers the skill. Could be any API: an LLM proxy, a data feed, a code analysis tool, a price oracle, or a custom computation.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">CRE Confidential HTTP</h4>
                <p className="mb-[7px]">The CRE workflow uses the <strong>Confidential HTTP capability</strong> to call this endpoint. The creator's API key (retrieved from Vault) is injected into the <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">Authorization</code> header — but it never appears in CRE logs, never hits the blockchain, never reaches the calling agent.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">What the agent sees</h4>
                <p className="mb-[7px]">Only the result of the API call (the skill output). The endpoint URL, API key, and implementation details are fully hidden.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Tags</h4>
                <p className="mb-[7px]">
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">CRE Conf. HTTP</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Bearer Auth</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Vault Key</span>
                </p>
            </>
        )
    },
    creator: {
        title: "💰  Creator — Skill Owner",
        body: (
            <>
                <h4 className="text-t0 text-[10px] font-bold mb-[3px] tracking-[0.3px] uppercase font-mono">Role</h4>
                <p className="mb-[7px]">Any developer, researcher, or organisation that builds a skill and registers it on the AgentToll marketplace. They own the IP and control the pricing.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">What they publish</h4>
                <p className="mb-[7px]">A skill endpoint URL, a USDC price per call, and their wallet address — registered on the on-chain skill registry on Base Sepolia.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">What stays private</h4>
                <p className="mb-[7px]">Their API key lives in the Vault DON — never on-chain, never visible to agents or operators. The CRE workflow accesses it only at runtime under the creator's configured conditions.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">How they earn</h4>
                <p className="mb-[7px]">For every successful invocation, <code className="font-mono text-[9.5px] bg-bg3 p-[1px_4px] rounded-[2px] text-t1 border border-b0">0.001 USDC</code> (or their set price) is transferred atomically to their wallet. Per call. No platform cut. No subscription. No LLM vendor lock-in.</p>
                <h4 className="text-t0 text-[10px] font-bold my-[11px] mb-[3px] tracking-[0.3px] uppercase font-mono">Tags</h4>
                <p className="mb-[7px]">
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Skill Registry</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">USDC</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Base L2</span>
                    <span className="inline-block text-[8.5px] bg-bg3 border border-b1 rounded-[2px] p-[1px_4px] mx-[2px] text-t2 font-mono">Vault</span>
                </p>
            </>
        )
    }
};

export const ALL_NODES = ["agent", "gateway", "chain", "cre", "vault", "api", "creator"];
export const TOGGLE_LABELS = [
    "x402 Pay",
    "Trigger",
    "CRE Recv",
    "Vault",
    "Conf.HTTP",
    "Result",
    "Paid",
];

export const STEPS: Record<number, StepData> = {
    1: {
        file: "x402-gateway.ts",
        lang: "TS",
        sub: [
            "STEP 1 — AGENT PAYS VIA x402",
            "AI Agent calls the skill, receives 402, pays 0.001 USDC on Base Sepolia — confirmed in ~2 seconds.",
        ],
        cur: ["agent", "gateway", "chain"],
        arrows: [
            { f: "agent", t: "gateway", lbl: "POST /v1/skill/analyze", o: -9, col: "w" },
            { f: "gateway", t: "agent", lbl: "402 Payment Required", o: 9, col: "g" },
            { f: "agent", t: "chain", lbl: "0.001 USDC payment", o: 0, col: "w" },
            { f: "chain", t: "gateway", lbl: "confirmed on-chain", o: 0, col: "g" },
        ],
        code: "s1",
    },
    2: {
        file: "jwt-trigger.ts",
        lang: "TS",
        sub: [
            "STEP 2 — GATEWAY FIRES CRE TRIGGER",
            "Payment verified. Gateway signs a JWT and POSTs it to the CRE HTTP trigger endpoint to start the workflow.",
        ],
        cur: ["gateway", "cre"],
        arrows: [{ f: "gateway", t: "cre", lbl: "JWT-signed trigger", o: 0, col: "w" }],
        code: "s2",
    },
    3: {
        file: "handler.ts",
        lang: "TS",
        sub: [
            "STEP 3 — CRE WORKFLOW RECEIVES REQUEST",
            "All DON nodes begin executing the handler in parallel. BFT consensus will validate every step output.",
        ],
        cur: ["cre"],
        arrows: [{ f: "gateway", t: "cre", lbl: "trigger received", o: 0, col: "w" }],
        code: "s3",
    },
    4: {
        file: "vault-secret.ts",
        lang: "TS",
        sub: [
            "STEP 4 — getSecret() — VAULT RETRIEVES KEY ★",
            "Creator's API key assembled from threshold-encrypted shares. No single node holds the complete key.",
        ],
        cur: ["cre", "vault"],
        arrows: [
            { f: "cre", t: "vault", lbl: "getSecret(CREATOR_API_KEY)", o: -9, col: "w" },
            { f: "vault", t: "cre", lbl: "partial key shares", o: 9, col: "g" },
        ],
        code: "s4",
    },
    5: {
        file: "confidential-http.ts",
        lang: "TS",
        sub: [
            "STEP 5 — CONFIDENTIAL HTTP CALL EXECUTES",
            "CRE calls the Skill API with the creator's key injected. Key never logged, never on-chain, never visible to the agent.",
        ],
        cur: ["cre", "api"],
        arrows: [
            { f: "cre", t: "api", lbl: "Bearer ${apiKey} [hidden]", o: -9, col: "w" },
            { f: "api", t: "cre", lbl: "200 OK { result }", o: 9, col: "g" },
        ],
        code: "s5",
    },
    6: {
        file: "evm-write.ts",
        lang: "TS",
        sub: [
            "STEP 6 — RESULT WRITTEN ON-CHAIN & RETURNED",
            "DON submits multi-signed report via Keystone Forwarder. Verified result delivered to the agent.",
        ],
        cur: ["cre", "chain", "agent"],
        arrows: [
            { f: "cre", t: "chain", lbl: "onReport() via Forwarder", o: -8, col: "w" },
            { f: "chain", t: "agent", lbl: "verified result", o: 8, col: "g" },
        ],
        code: "s6",
    },
    7: {
        file: "creator-wallet.ts",
        lang: "SOLIDITY",
        sub: [
            "STEP 7 — CREATOR RECEIVES USDC ✓",
            "0.001 USDC transferred to creator's wallet. Atomic. Per-call. No platform cut. No subscription.",
        ],
        cur: ["chain", "creator"],
        arrows: [{ f: "chain", t: "creator", lbl: "+ 0.001 USDC", o: 0, col: "w" }],
        code: "s7",
    },
};

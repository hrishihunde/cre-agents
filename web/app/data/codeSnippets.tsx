import React from 'react';
import { CodeLine as L } from '../components/CodeLine';
import { Kw, Fn, St, Cm, Nm } from '../components/Syntax';

export const CODE_SNIPPETS: Record<string, React.ReactNode> = {
    s1: (
        <>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[#888] mb-[3px]">x402 — HTTP Payment Protocol</div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">
                    Agent calls skill, gets 402, pays USDC on Base. Gateway verifies on-chain before triggering CRE.
                </div>
            </div>
            <L n={1}><Cm>// x402-gateway.ts</Cm></L>
            <L n={2}></L>
            <L n={3}><Kw>import</Kw> {'{verifyPayment}'} <Kw>from</Kw> <St>'@x402/facilitator'</St>;</L>
            <L n={4}></L>
            <L n={5}><Kw>export async function</Kw> <Fn>handle</Fn>(req) {'{'}</L>
            <L n={6} hd><Cm>// 1. Return 402 if no payment header</Cm></L>
            <L n={7} hd><Kw>if</Kw> (!req.headers[<St>'X-Payment'</St>])</L>
            <L n={8}>  <Kw>return</Kw> Response(pay402, {'{'}status:<Nm>402</Nm>{'}'});</L>
            <L n={9}></L>
            <L n={10} hl><Cm>// 2. Verify USDC payment on Base</Cm></L>
            <L n={11} hl><Kw>const</Kw> ok = <Kw>await</Kw> <Fn>verifyPayment</Fn>({'{'}</L>
            <L n={12}>  chain: baseSepolia,</L>
            <L n={13}>  amount: <St>'0.001'</St>, token: USDC,</L>
            <L n={14}>{'}'});</L>
            <L n={15}><Kw>if</Kw> (!ok) <Kw>throw</Kw> <St>'invalid'</St>;</L>
            <L n={16}>{'}'}</L>
        </>
    ),
    s2: (
        <>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[#888] mb-[3px]">JWT-Signed CRE Trigger</div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">Gateway signs payload with ECDSA. JWT has 5-min expiry and unique jti to prevent replay.</div>
            </div>
            <L n={1}><Cm>// jwt-trigger.ts</Cm></L>
            <L n={2}></L>
            <L n={3} hl><Kw>const</Kw> jwt = <Kw>await</Kw> <Fn>signJWT</Fn>({'{'}</L>
            <L n={4} hl>  iss: GATEWAY_PUBKEY,</L>
            <L n={5} hl>  exp: Date.now() + <Nm>5</Nm> * <Nm>60_000</Nm>,</L>
            <L n={6} hl>  jti: <Fn>randomUUID</Fn>(),</L>
            <L n={7} hl>  input: payload,</L>
            <L n={8}>{'}'});</L>
            <L n={9}></L>
            <L n={10}><Cm>// POST to CRE HTTP trigger</Cm></L>
            <L n={11} hl><Kw>await</Kw> <Fn>fetch</Fn>(CRE_TRIGGER_URL, {'{'}</L>
            <L n={12}>  method: <St>'POST'</St>,</L>
            <L n={13}>  headers: {'{'}Authorization: `Bearer {'${jwt}'}`{'}'},</L>
            <L n={14}>  body: JSON.stringify({'{'}input{'}'}),</L>
            <L n={15}>{'}'});</L>
        </>
    ),
    s3: (
        <>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[#888] mb-[3px]">CRE Workflow Handler</div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">All DON nodes execute this handler simultaneously. BFT consensus validates each step output.</div>
            </div>
            <L n={1}><Cm>// handler.ts</Cm></L>
            <L n={2}></L>
            <L n={3}><Kw>import</Kw> {'{'}workflow, runtime{'}'}</L>
            <L n={4}>  <Kw>from</Kw> <St>'@chainlink/cre-sdk'</St>;</L>
            <L n={5}></L>
            <L n={6} hl><Kw>export default</Kw> <Fn>workflow</Fn>(<Kw>async</Kw> (ctx) {`=>`} {'{'}</L>
            <L n={7}></L>
            <L n={8}>  <Cm>// Input from x402 gateway JWT</Cm></L>
            <L n={9}>  <Kw>const</Kw> input = ctx.args.input;</L>
            <L n={10}></L>
            <L n={11}>  <Cm>// Steps 4 → 5 → 6 follow...</Cm></L>
            <L n={12}></L>
            <L n={13}>  ctx.log.info(<St>'Started'</St>, {'{'}input{'}'});</L>
            <L n={14}>{'}'});</L>
        </>
    ),
    s4: (
        <>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[#fff] mb-[3px]">★ Privacy Core — getSecret()</div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">No single node holds the full key. Threshold shares assembled in memory — never logged or on-chain.</div>
            </div>
            <L n={1}><Cm>// vault-secret.ts</Cm></L>
            <L n={2}></L>
            <L n={3} hl><Cm>// ★ KEY NEVER LOGGED / ON-CHAIN</Cm></L>
            <L n={4} hl><Kw>const</Kw> apiKey = runtime</L>
            <L n={5} hl>  .getSecret({'{'}</L>
            <L n={6} hl>    id: <St>'CREATOR_API_KEY'</St></L>
            <L n={7} hl>  {'}'}).result().value;</L>
            <L n={8}></L>
            <L n={9}><Cm>// In memory only — never exposed</Cm></L>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px] mt-[8px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[#888] mb-[3px]">Vault DON — Threshold</div>
                <div className="grid grid-cols-5 gap-[3px] my-[7px]">
                    <div className="bg-[var(--bg4)] border-[var(--b1)] rounded-full aspect-square flex items-center justify-center text-[8px] text-[var(--t2)] border">N1</div>
                    <div className="bg-[var(--bg4)] border-[var(--b1)] rounded-full aspect-square flex items-center justify-center text-[8px] text-[var(--t2)] border">N2</div>
                    <div className="bg-[var(--bg4)] border-[var(--t0)] text-[var(--t0)] rounded-full aspect-square flex items-center justify-center text-[8px] border">🔑</div>
                    <div className="bg-[var(--bg4)] border-[var(--b1)] rounded-full aspect-square flex items-center justify-center text-[8px] text-[var(--t2)] border">N4</div>
                    <div className="bg-[var(--bg4)] border-[var(--b1)] rounded-full aspect-square flex items-center justify-center text-[8px] text-[var(--t2)] border">N5</div>
                </div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">Each node holds one partial share. No quorum = no key.</div>
            </div>
        </>
    ),
    s5: (
        <>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[#888] mb-[3px]">Confidential HTTP Capability</div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">API key injected at runtime via CRE. Never appears in logs, never reaches the agent, never on-chain.</div>
            </div>
            <L n={1}><Cm>// confidential-http.ts</Cm></L>
            <L n={2}></L>
            <L n={3} hl><Kw>const</Kw> resp = <Kw>await</Kw> ctx.httpClient</L>
            <L n={4} hl>  .request(<St>'POST'</St>, SKILL_URL, {'{'}</L>
            <L n={5}>    headers: {'{'}</L>
            <L n={6} hl>      Authorization:</L>
            <L n={7} hl>        `Bearer {'${apiKey}'}`,  <Cm>// ★</Cm></L>
            <L n={8}>    {'}'},</L>
            <L n={9}>    body: JSON.stringify(input),</L>
            <L n={10}>  {'}'});</L>
            <L n={11}></L>
            <L n={12} hl><Kw>const</Kw> result = resp.result.body;</L>
            <L n={13}></L>
            <L n={14}><Cm>// apiKey: NEVER in logs ✓</Cm></L>
        </>
    ),
    s6: (
        <>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[#888] mb-[3px]">Keystone Forwarder — On-chain Write</div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">DON submits multi-signed report. Forwarder verifies quorum signatures, calls onReport() on your contract.</div>
            </div>
            <L n={1}><Cm>// evm-write.ts</Cm></L>
            <L n={2}></L>
            <L n={3} hl><Kw>await</Kw> ctx.evmClient</L>
            <L n={4} hl>  .send(<St>'onReport'</St>, [result]);</L>
            <L n={5}></L>
            <L n={6}><Cm>// KeystoneForwarder verifies</Cm></L>
            <L n={7}><Cm>// quorum node signatures, then:</Cm></L>
            <L n={8}><Cm>// contract.onReport(meta, data)</Cm></L>
            <L n={9}></L>
            <L n={10}>ctx.log.info(<St>'Written'</St>, {'{'}txHash{'}'});</L>
            <L n={11}></L>
            <L n={12} hl><Cm>// Verified. Immutable. On-chain ✓</Cm></L>
        </>
    ),
    s7: (
        <>
            <div className="m-[8px_11px] bg-[#222] border border-[#2e2e2e] rounded-[4px] py-[7px] px-[9px]">
                <div className="text-[8.5px] font-bold tracking-[0.5px] uppercase text-[var(--t1)] mb-[3px]">Atomic Per-Call Settlement ✓</div>
                <div className="text-[9.5px] text-[#555] leading-[1.65] font-sans">0.001 USDC to creator wallet. Per call. Atomic. No platform cut. Recorded on-chain.</div>
            </div>
            <L n={1}><Cm>// skill-registry.sol (Solidity)</Cm></L>
            <L n={2}></L>
            <L n={3}><Kw>event</Kw> <Fn>SkillUsed</Fn>(</L>
            <L n={4}>  address creator,</L>
            <L n={5} hl>  uint256 amount,  <Cm>// 0.001 USDC</Cm></L>
            <L n={6}>  bytes32 skillId</L>
            <L n={7}>);</L>
            <L n={8}></L>
            <L n={9} hl>USDC.transfer(</L>
            <L n={10} hl>  creator.address,</L>
            <L n={11} hl>  <Nm>1000</Nm>  <Cm>// 0.001 USDC (6 dec)</Cm></L>
            <L n={12} hl>);</L>
            <L n={13}></L>
            <L n={14}><Cm>// No platform cut. No lock-in ✓</Cm></L>
        </>
    )
};

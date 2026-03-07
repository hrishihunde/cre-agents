import React from 'react';

export const Topbar = () => {
    return (
        <div className="col-span-full bg-bg1 border-b border-b0 flex items-center px-[14px] gap-[14px] z-50 overflow-hidden shrink-0">
            <div className="flex items-center gap-[7px]">
                <div className="w-[20px] h-[20px] bg-t0 rounded-[4px] flex items-center justify-center text-[9px] font-bold text-bg shrink-0">
                    AT
                </div>
                <span className="text-[12px] font-semibold text-t0 whitespace-nowrap">
                    AgentToll
                </span>
                <span className="text-[9px] text-t3 bg-bg3 border border-b0 px-[5px] py-[1px] rounded-[2px] uppercase tracking-[0.5px]">
                    demo
                </span>
            </div>
            <div className="w-[1px] h-[18px] bg-b0 shrink-0"></div>
            <span className="text-[10px] text-t3 tracking-[0.2px] truncate">
                x402 · CRE Confidential HTTP · Chainlink Vault DON
            </span>
            <div className="ml-auto flex items-center gap-[7px] shrink-0">
                <div className="w-[5px] h-[5px] rounded-full bg-t2 animate-[blink_2s_infinite] shrink-0 flex"></div>
                <span className="text-[9px] text-t3 border border-b0 px-[6px] py-[2px] rounded-[2px] bg-bg2 whitespace-nowrap">
                    Base Sepolia
                </span>
                <span className="text-[9px] text-t3 border border-b0 px-[6px] py-[2px] rounded-[2px] bg-bg2 whitespace-nowrap">
                    0.001 USDC / call
                </span>
                <span className="text-[9px] text-t3 border border-b0 px-[6px] py-[2px] rounded-[2px] bg-bg2 whitespace-nowrap hidden sm:inline-block">
                    Privacy Track
                </span>
            </div>
        </div>
    );
};

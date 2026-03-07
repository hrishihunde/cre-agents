import React from 'react';

interface SidebarProps {
    curStep: number;
    setCurStep: (step: number) => void;
}

export const Sidebar = ({ curStep, setCurStep }: SidebarProps) => {
    return (
        <div className="bg-bg1 border-r border-b0 overflow-y-auto overflow-x-hidden flex flex-col pt-1">
            {/* Gateway Section */}
            <div className="py-[9px] pb-[2px] flex flex-col">
                <div className="px-[12px] py-[3px] text-[9px] font-semibold tracking-[0.9px] uppercase text-t3">
                    x402 Gateway
                </div>

                <div
                    className={`flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] cursor-pointer border-l-2 transition-all duration-100 select-none pl-[20px] hover:bg-bg2 hover:text-t1 ${curStep === 1 ? 'bg-bg3 text-t0 border-l-t0' : 'text-t2 border-l-transparent'}`}
                    onClick={() => setCurStep(1)}
                >
                    <div className={`sb-icon ${curStep > 1 ? 'bg-t2 border-t2 text-bg' : curStep === 1 ? 'border-t0 text-bg bg-transparent' : ''}`}>
                        {curStep > 1 ? "✓" : ""}
                    </div>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">x402-gateway.ts</span>
                    <span className="text-[8px] px-[4px] py-[1px] rounded-[2px] border border-b0 text-t4 bg-bg3">S1</span>
                </div>

                <div
                    className={`flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] cursor-pointer border-l-2 transition-all duration-100 select-none pl-[20px] hover:bg-bg2 hover:text-t1 ${curStep === 2 ? 'bg-bg3 text-t0 border-l-t0' : 'text-t2 border-l-transparent'}`}
                    onClick={() => setCurStep(2)}
                >
                    <div className={`sb-icon ${curStep > 2 ? 'bg-t2 border-t2 text-bg' : curStep === 2 ? 'border-t0 text-bg bg-transparent' : ''}`}>
                        {curStep > 2 ? "✓" : ""}
                    </div>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">jwt-trigger.ts</span>
                    <span className="text-[8px] px-[4px] py-[1px] rounded-[2px] border border-b0 text-t4 bg-bg3">S2</span>
                </div>

                <div className="flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] text-t2 cursor-pointer border-l-2 border-l-transparent transition-all duration-100 select-none pl-[30px] hover:bg-bg2 hover:text-t1">
                    <span className="text-[10px]">📄</span>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">payment.config.ts</span>
                </div>
            </div>

            <div className="h-[1px] bg-b0 my-[5px]"></div>

            {/* CRE Workflow Section */}
            <div className="py-[9px] pb-[2px] flex flex-col">
                <div className="px-[12px] py-[3px] text-[9px] font-semibold tracking-[0.9px] uppercase text-t3">
                    CRE Workflow
                </div>

                {[3, 4, 5, 6].map((st) => (
                    <div
                        key={st}
                        className={`flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] cursor-pointer border-l-2 transition-all duration-100 select-none pl-[20px] hover:bg-bg2 hover:text-t1 ${curStep === st ? 'bg-bg3 text-t0 border-l-t0' : 'text-t2 border-l-transparent'}`}
                        onClick={() => setCurStep(st)}
                    >
                        <div className={`sb-icon ${curStep > st ? 'bg-t2 border-t2 text-bg' : curStep === st ? 'border-t0 text-bg bg-transparent' : ''}`}>
                            {curStep > st ? "✓" : ""}
                        </div>
                        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            {st === 3 ? "handler.ts" : st === 4 ? "vault-secret.ts" : st === 5 ? "confidential-http.ts" : "evm-write.ts"}
                        </span>
                        <span className="text-[8px] px-[4px] py-[1px] rounded-[2px] border border-b0 text-t4 bg-bg3">S${st}</span>
                    </div>
                ))}

                <div className="flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] text-t2 cursor-pointer border-l-2 border-l-transparent transition-all duration-100 select-none pl-[30px] hover:bg-bg2 hover:text-t1">
                    <span className="text-[10px]">📄</span>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">secrets.yaml</span>
                </div>
                <div className="flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] text-t2 cursor-pointer border-l-2 border-l-transparent transition-all duration-100 select-none pl-[30px] hover:bg-bg2 hover:text-t1">
                    <span className="text-[10px]">📄</span>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">config.yml</span>
                </div>
            </div>

            <div className="h-[1px] bg-b0 my-[5px]"></div>

            {/* Settlement Section */}
            <div className="py-[9px] pb-[2px] flex flex-col">
                <div className="px-[12px] py-[3px] text-[9px] font-semibold tracking-[0.9px] uppercase text-t3">
                    Settlement
                </div>
                <div
                    className={`flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] cursor-pointer border-l-2 transition-all duration-100 select-none pl-[20px] hover:bg-bg2 hover:text-t1 ${curStep === 7 ? 'bg-bg3 text-t0 border-l-t0' : 'text-t2 border-l-transparent'}`}
                    onClick={() => setCurStep(7)}
                >
                    <div className={`sb-icon ${curStep > 7 ? 'bg-t2 border-t2 text-bg' : curStep === 7 ? 'border-t0 text-bg bg-transparent' : ''}`}>
                        {curStep > 7 ? "✓" : ""}
                    </div>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">creator-wallet.ts</span>
                    <span className="text-[8px] px-[4px] py-[1px] rounded-[2px] border border-b0 text-t4 bg-bg3">S7</span>
                </div>

                <div className="flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] text-t2 cursor-pointer border-l-2 border-l-transparent transition-all duration-100 select-none pl-[30px] hover:bg-bg2 hover:text-t1">
                    <span className="text-[10px]">📄</span>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">skill-registry.sol</span>
                </div>
            </div>

            <div className="h-[1px] bg-b0 my-[5px]"></div>

            {/* Config Section */}
            <div className="py-[9px] pb-[2px] flex flex-col">
                <div className="px-[12px] py-[3px] text-[9px] font-semibold tracking-[0.9px] uppercase text-t3">
                    Config
                </div>

                <div className="flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] text-t2 cursor-pointer border-l-2 border-l-transparent transition-all duration-100 select-none pl-[20px] hover:bg-bg2 hover:text-t1">
                    <span className="text-[10px]">📄</span>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">package.json</span>
                </div>
                <div className="flex items-center gap-[5px] px-[12px] py-[3px] text-[11px] text-t2 cursor-pointer border-l-2 border-l-transparent transition-all duration-100 select-none pl-[20px] hover:bg-bg2 hover:text-t1">
                    <span className="text-[10px]">📄</span>
                    <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">README.md</span>
                </div>
            </div>
        </div>
    );
};

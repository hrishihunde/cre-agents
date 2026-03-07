import React from 'react';
import { StepData } from '../types';
import { CODE_SNIPPETS } from '../data/codeSnippets';

interface CodePanelProps {
    cStep: StepData | null;
}

export const CodePanel = ({ cStep }: CodePanelProps) => {
    return (
        <div className="col-start-3 bg-bg1 border-l border-b0 flex flex-col overflow-hidden">
            <div className="flex h-[36px] border-b border-b0 items-center px-[12px] gap-[7px] shrink-0">
                <span className="text-[10px] text-t2 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {cStep ? cStep.file : "— no file selected —"}
                </span>
                <span className="text-[8px] text-t3 bg-bg3 px-[4px] py-[1px] rounded-[2px] border border-b0 tracking-widest">
                    {cStep ? cStep.lang : "TS"}
                </span>
            </div>
            <div className="flex-1 overflow-y-auto">
                {cStep && CODE_SNIPPETS[cStep.code] ? (
                    <div className="fi py-[6px]">
                        {CODE_SNIPPETS[cStep.code]}
                    </div>
                ) : (
                    <div className="p-[28px_12px] text-center text-t4 text-[10px] leading-[2.2]">
                        <div className="text-[18px] mb-[8px] opacity-30">{`{ }`}</div>
                        Select a step
                        <br />
                        to view code
                    </div>
                )}
            </div>
        </div>
    );
};

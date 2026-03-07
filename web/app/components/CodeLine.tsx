import React from 'react';

interface CodeLineProps {
    n: number;
    children?: React.ReactNode;
    hl?: boolean;
    hd?: boolean;
}

export const CodeLine = ({ n, children, hl, hd }: CodeLineProps) => {
    let c = '';
    if (hl) c = 'hl';
    if (hd) c = 'hd';

    return (
        <div className={`code-line ${c}`}>
            <span className="w-[16px] text-right select-none text-[8.5px] pt-[1px] text-[#333333]">
                {n}
            </span>
            <span>{children}</span>
        </div>
    );
};

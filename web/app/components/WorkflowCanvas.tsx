import React, { useRef, useEffect, useState } from 'react';
import { ALL_NODES, STEPS } from '../data/constants';

interface WorkflowCanvasProps {
    curStep: number;
    openInfo: (id: string, e: React.MouseEvent) => void;
}

export const WorkflowCanvas = ({ curStep, openInfo }: WorkflowCanvasProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [arrows, setArrows] = useState<React.ReactElement[]>([]);

    const cStep = STEPS[curStep];

    useEffect(() => {
        drawLayoutArrows();
        const handleResize = () => {
            if (curStep > 0) drawLayoutArrows();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [curStep]);

    const getC = (id: string) => {
        const nd = document.getElementById("nd-" + id);
        const cv = canvasRef.current;
        if (!nd || !cv) return null;
        const nr = nd.getBoundingClientRect();
        const cr = cv.getBoundingClientRect();
        return {
            x: nr.left - cr.left + nr.width / 2,
            y: nr.top - cr.top + nr.height / 2,
            w: nr.width,
            h: nr.height,
        };
    };

    const drawLayoutArrows = () => {
        const newArrows: React.ReactElement[] = [];

        // Draw past arrows (dim)
        for (let i = 1; i < curStep; i++) {
            const stepData = STEPS[i];
            if (stepData && stepData.arrows) {
                stepData.arrows.forEach((a, idx) => {
                    newArrows.push(createArrowElement(a, false, `dim-${i}-${idx}`));
                });
            }
        }

        // Draw current active arrows
        const currentStepData = STEPS[curStep];
        if (currentStepData && currentStepData.arrows) {
            currentStepData.arrows.forEach((a, idx) => {
                newArrows.push(createArrowElement(a, true, `act-${curStep}-${idx}`));
            });
        }

        setArrows(newArrows);
    };

    const createArrowElement = (a: any, isActive: boolean, key: string) => {
        const F = getC(a.f);
        const T = getC(a.t);
        if (!F || !T) return <g key={key}></g>;

        const dx = T.x - F.x;
        const dy = T.y - F.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const off = a.o || 0;
        const nx = (-dy / len) * off;
        const ny = (dx / len) * off;
        const x1 = F.x + (dx / len) * (F.w / 2 + 5) + nx;
        const y1 = F.y + (dy / len) * (F.h / 2 + 5) + ny;
        const x2 = T.x - (dx / len) * (T.w / 2 + 9) + nx;
        const y2 = T.y - (dy / len) * (T.h / 2 + 9) + ny;

        const col = isActive ? (a.col === "w" ? "#ffffff" : "#666666") : "#232323";
        const mid = isActive ? (a.col === "w" ? "aw" : "ag") : "ad";

        return (
            <g key={key}>
                <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={col}
                    strokeWidth={isActive ? "1.5" : "1"}
                    strokeDasharray={isActive ? "6 3" : "3 5"}
                    markerEnd={`url(#${mid})`}
                    style={{ animation: isActive ? "dash 10s linear infinite" : "none" }}
                />
                {isActive && (
                    <foreignObject
                        x={(x1 + x2) / 2 + nx * 0.4 - 74}
                        y={(y1 + y2) / 2 + ny * 0.4 - 9 - 7}
                        width={148}
                        height={18}
                    >
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            style={{
                                font: "8.5px/1 'Geist Mono',monospace",
                                color: col,
                                textAlign: "center",
                                padding: "1px 5px",
                                background: "rgba(8,8,8,.92)",
                                borderRadius: "2px",
                                border: "1px solid #2a2a2a",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {a.lbl}
                        </div>
                    </foreignObject>
                )}
            </g>
        );
    };

    return (
        <div ref={canvasRef} className="flex-1 relative overflow-hidden">
            <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <marker
                        id="aw"
                        markerWidth="7"
                        markerHeight="5"
                        refX="6"
                        refY="2.5"
                        orient="auto"
                    >
                        <polygon points="0 0,7 2.5,0 5" fill="#ffffff" />
                    </marker>
                    <marker
                        id="ag"
                        markerWidth="7"
                        markerHeight="5"
                        refX="6"
                        refY="2.5"
                        orient="auto"
                    >
                        <polygon points="0 0,7 2.5,0 5" fill="#555555" />
                    </marker>
                    <marker
                        id="ad"
                        markerWidth="7"
                        markerHeight="5"
                        refX="6"
                        refY="2.5"
                        orient="auto"
                    >
                        <polygon points="0 0,7 2.5,0 5" fill="#282828" />
                    </marker>
                </defs>
                {arrows}
            </svg>

            {/* NODES */}
            {ALL_NODES.map((id) => {
                const styleProps = {
                    agent: { left: "8%", top: "50%" },
                    gateway: { left: "29%", top: "26%" },
                    chain: { left: "29%", top: "74%" },
                    cre: { left: "52%", top: "50%" },
                    vault: { left: "73%", top: "24%" },
                    api: { left: "73%", top: "63%" },
                    creator: { left: "91%", top: "50%" },
                }[id as keyof typeof styleProps];

                const isCur = cStep?.cur.includes(id);
                let wasCur = false;
                for (let j = 1; j < curStep; j++) {
                    if (STEPS[j]?.cur.includes(id)) {
                        wasCur = true;
                        break;
                    }
                }
                const isDone = !isCur && wasCur;
                const isDim = !isCur && !wasCur;

                const emojis = {
                    agent: "🤖",
                    gateway: "⚡",
                    chain: "🔗",
                    cre: "⚙️",
                    vault: "🔐",
                    api: "🌐",
                    creator: "💰",
                }[id as keyof typeof emojis];

                const titles: Record<string, string> = {
                    agent: "AI Agent",
                    gateway: "x402 Gateway",
                    chain: "Base Sepolia",
                    cre: "CRE Workflow",
                    vault: "Vault DON",
                    api: "Skill API",
                    creator: "Creator",
                };

                const subs: Record<string, string> = {
                    agent: "Consumer",
                    gateway: "Payment · JWT",
                    chain: "L2 · USDC",
                    cre: "DON · handler.ts",
                    vault: "Threshold Enc.",
                    api: "Conf. HTTP",
                    creator: "Skill owner",
                };

                return (
                    <div
                        key={id}
                        id={`nd-${id}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                        style={styleProps}
                    >
                        <div
                            className={`node-box ${isCur ? 'cur' : isDone ? 'done' : isDim ? 'dim' : ''}`}
                        >
                            <button className="info-btn" onClick={(e) => openInfo(id, e)}>
                                i
                            </button>
                            <span className="text-[16px] mb-[4px] block leading-none">{emojis}</span>
                            <div className="text-[11px] font-semibold text-t0 mb-[1px]">
                                {titles[id]}
                            </div>
                            <div className="text-[9px] text-t3 leading-[1.4]">{subs[id]}</div>
                            <div className={`mt-[5px] text-[8px] font-mono ${isCur || isDone ? 'text-t2' : 'text-t3'}`}>
                                {isCur ? 'running' : isDone ? 'done' : '—'}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

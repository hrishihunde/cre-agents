"use client";

import React, { useState, useEffect } from "react";
import { Topbar } from "./components/Topbar";
import { Sidebar } from "./components/Sidebar";
import { WorkflowCanvas } from "./components/WorkflowCanvas";
import { CodePanel } from "./components/CodePanel";
import { Modal } from "./components/Modal";
import { TOGGLE_LABELS, STEPS } from "./data/constants";

export default function Home() {
  const [curStep, setCurStep] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === "Escape") setModalOpen(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        setCurStep((prev) => Math.min(7, prev + 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        setCurStep((prev) => Math.max(1, prev - 1));
      if (e.key >= "1" && e.key <= "7") setCurStep(parseInt(e.key));
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const openInfo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModal(id);
    setModalOpen(true);
  };

  const cStep = STEPS[curStep];

  return (
    <div className="app-grid w-full h-full">
      <Topbar />
      <Sidebar curStep={curStep} setCurStep={setCurStep} />

      {/* ── CENTER ── */}
      <div className="bg-bg flex flex-col overflow-hidden relative col-start-2">
        {/* Toggle row */}
        <div className="flex items-center justify-center gap-[5px] px-[12px] shrink-0 h-[var(--tgh)] bg-bg1 border-b border-b0">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <button
              key={num}
              onClick={() => setCurStep(num)}
              className={`toggle-btn ${curStep === num ? "cur" : num < curStep ? "done" : ""
                }`}
            >
              {num < curStep && <span className="text-[9px] text-t2">✓</span>}
              <span className="font-bold">{num}</span>
              <span className="tl">{TOGGLE_LABELS[num - 1]}</span>
            </button>
          ))}
        </div>

        <WorkflowCanvas curStep={curStep} openInfo={openInfo} />

        {/* Subtitle */}
        <div className="flex shrink-0 h-[var(--subh)] border-t border-t-[var(--b0)] bg-bg1 items-center justify-center px-[28px] gap-[12px]">
          {cStep ? (
            <>
              <span className="text-[9px] font-semibold tracking-[0.7px] uppercase text-t3 whitespace-nowrap shrink-0">
                {cStep.sub[0]}
              </span>
              <span className="text-[11px] text-t2 font-sans leading-[1.5] text-center">
                {cStep.sub[1]}
              </span>
            </>
          ) : (
            <span className="text-[10px] text-t4 font-sans">
              Select a step above to begin
            </span>
          )}
        </div>
      </div>

      <CodePanel cStep={cStep || null} />

      {modalOpen && activeModal && (
        <Modal activeModal={activeModal} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}

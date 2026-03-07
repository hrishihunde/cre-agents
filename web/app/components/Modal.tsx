import React from 'react';
import { MODALS } from '../data/constants';

interface ModalProps {
    activeModal: string;
    setModalOpen: (open: boolean) => void;
}

export const Modal = ({ activeModal, setModalOpen }: ModalProps) => {
    const modalData = MODALS[activeModal];

    return (
        <div
            className="fixed inset-0 bg-black/75 z-[300] flex items-center justify-center"
            onClick={() => setModalOpen(false)}
        >
            <div
                className="bg-bg2 border border-b1 rounded-[8px] w-[440px] max-w-[90vw] max-h-[76vh] flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-[12px_14px] border-b border-b0 flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-t0">
                        {modalData.title}
                    </span>
                    <button
                        className="w-[20px] h-[20px] rounded-full border border-b1 bg-bg3 text-t2 cursor-pointer text-[11px] flex items-center justify-center transition-all duration-100 hover:border-t0 hover:text-t0"
                        onClick={() => setModalOpen(false)}
                    >
                        ✕
                    </button>
                </div>
                <div
                    className="p-[14px] overflow-y-auto flex-1 text-[10.5px] text-t2 leading-[1.85] font-sans"
                >
                    {modalData.body}
                </div>
            </div>
        </div>
    );
};

export interface ArrowData {
    f: string;
    t: string;
    lbl: string;
    o?: number;
    col: 'w' | 'g' | 'd';
}

export interface StepData {
    file: string;
    lang: string;
    sub: string[];
    cur: string[];
    arrows: ArrowData[];
    code: string;
}

export interface ModalData {
    title: string;
    body: React.ReactNode;
}

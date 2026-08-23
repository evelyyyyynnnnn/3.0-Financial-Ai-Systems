declare const logger: ({
    info: () => void;
    warn: () => void;
    error: () => void;
    debug: () => void;
} & import("./options.js").Logger) | Console;
type Notice = {
    id: string;
    text: string;
    level?: keyof typeof logger;
    onceOnly?: boolean;
    suppress?: boolean;
};
declare const notices: Record<string, Notice>;
export declare function showNotice(id: keyof typeof notices): void;
export declare function suppressNotices(noticeIds: (keyof typeof notices)[]): void;
export {};

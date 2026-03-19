import { Static } from "@sinclair/typebox";
interface Job {
    func: () => Promise<void>;
    resolve: (arg: any) => void;
    reject: (arg: any) => void;
}
export declare const QueueOptionsSchema: import("@sinclair/typebox").TObject<{
    concurrency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    timeout: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export type QueueOptions = Static<typeof QueueOptionsSchema>;
export default class Queue {
    concurrency: number;
    _running: number;
    _queue: Array<Job>;
    constructor(opts?: QueueOptions);
    runNext(): void;
    checkQueue(): void;
    add(func: () => Promise<any>): Promise<unknown>;
}
export {};

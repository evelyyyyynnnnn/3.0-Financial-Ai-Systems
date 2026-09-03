import { Type } from "@sinclair/typebox";
export const QueueOptionsSchema = Type.Object({
    // TODO: adds func type to json schema which is not supported
    //_queue?: Queue;
    concurrency: Type.Optional(Type.Number()),
    timeout: Type.Optional(Type.Number()), // TODO
}, {
    additionalProperties: false,
    title: "QueueOptions",
});
export default class Queue {
    constructor(opts = {}) {
        this.concurrency = 1;
        this._running = 0;
        this._queue = [];
        if (opts.concurrency)
            this.concurrency = opts.concurrency;
    }
    runNext() {
        const job = this._queue.shift();
        if (!job)
            return;
        this._running++;
        job
            .func()
            .then((result) => job.resolve(result))
            .catch((error) => job.reject(error))
            .finally(() => {
            this._running--;
            this.checkQueue();
        });
    }
    checkQueue() {
        if (this._running < this.concurrency)
            this.runNext();
    }
    add(func) {
        return new Promise((resolve, reject) => {
            this._queue.push({ func, resolve, reject });
            this.checkQueue();
        });
    }
}

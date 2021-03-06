import { Scheduler } from '../Scheduler';
import { Observable } from '../Observable';
import { Subscription } from '../Subscription';
import { Subscriber } from '../Subscriber';
/**
 *
 */
export declare class RangeObservable extends Observable<number> {
    /**
     * @param start
     * @param end
     * @param scheduler
     * @return {RangeObservable}
     * @static true
     * @name range
     * @owner Observable
     */
    static create(start?: number, end?: number, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): void;
    private start;
    private end;
    private scheduler;
    constructor(start: number, end: number, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
}

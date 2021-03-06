import { Scheduler } from '../Scheduler';
import { Observable } from '../Observable';
import { Subscription } from '../Subscription';
import { Subscriber } from '../Subscriber';
/**
 *
 */
export declare class TimerObservable extends Observable<number> {
    /**
     * @param dueTime
     * @param period
     * @param scheduler
     * @return {TimerObservable}
     * @static true
     * @name timer
     * @owner Observable
     */
    static create(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler): Observable<number>;
    static dispatch(state: any): any;
    private period;
    private dueTime;
    private scheduler;
    constructor(dueTime?: number | Date, period?: number | Scheduler, scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<number>): Subscription | Function | void;
}

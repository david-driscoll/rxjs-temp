import { Scheduler } from '../Scheduler';
import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
/**
 *
 */
export declare class ArrayObservable<T> extends Observable<T> {
    array: T[];
    scheduler: Scheduler;
    /**
     * @param array
     * @param scheduler
     * @return {ArrayObservable}
     * @static true
     * @name fromArray
     * @owner Observable
     */
    static create<T>(array: T[], scheduler?: Scheduler): ArrayObservable<T>;
    /**
     * @param array
     * @return {any}
     * @static true
     * @name of
     * @owner Observable
     */
    static of<T>(...array: Array<T | Scheduler>): Observable<T>;
    static dispatch(state: any): void;
    value: any;
    constructor(array: T[], scheduler?: Scheduler);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
}

import { Scheduler } from '../Scheduler';
import { Observable } from '../Observable';
import { Subscription } from '../Subscription';
/**
 *
 */
export declare class ErrorObservable extends Observable<any> {
    error: any;
    private scheduler;
    /**
     * @param error
     * @param scheduler
     * @return {ErrorObservable}
     * @static true
     * @name throw
     * @owner Observable
     */
    static create<T>(error: any, scheduler?: Scheduler): ErrorObservable;
    static dispatch({error, subscriber}: {
        error: any;
        subscriber: any;
    }): void;
    constructor(error: any, scheduler?: Scheduler);
    protected _subscribe(subscriber: any): Subscription | Function | void;
}

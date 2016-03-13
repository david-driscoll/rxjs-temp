import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
/**
 *
 */
export declare class NeverObservable<T> extends Observable<T> {
    /**
     * @return {NeverObservable<T>}
     * @static true
     * @name never
     * @owner Observable
     */
    static create<T>(): NeverObservable<T>;
    constructor();
    protected _subscribe(subscriber: Subscriber<T>): void;
}

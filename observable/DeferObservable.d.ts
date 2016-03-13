import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
/**
 *
 */
export declare class DeferObservable<T> extends Observable<T> {
    private observableFactory;
    /**
     * @param observableFactory
     * @return {DeferObservable}
     * @static true
     * @name defer
     * @owner Observable
     */
    static create<T>(observableFactory: () => Observable<T>): Observable<T>;
    constructor(observableFactory: () => Observable<T>);
    protected _subscribe(subscriber: Subscriber<T>): void;
}

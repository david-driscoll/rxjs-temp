import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
/**
 *
 */
export declare class FromEventPatternObservable<T, R> extends Observable<T> {
    private addHandler;
    private removeHandler;
    private selector;
    /**
     * @param addHandler
     * @param removeHandler
     * @param selector
     * @return {FromEventPatternObservable}
     * @static true
     * @name fromEventPattern
     * @owner Observable
     */
    static create<T>(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T): FromEventPatternObservable<T, {}>;
    constructor(addHandler: (handler: Function) => any, removeHandler: (handler: Function) => void, selector?: (...args: Array<any>) => T);
    protected _subscribe(subscriber: Subscriber<T>): void;
}

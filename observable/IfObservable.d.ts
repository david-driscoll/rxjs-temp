import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
export declare class IfObservable<T, R> extends Observable<T> {
    private condition;
    private thenSource;
    private elseSource;
    static create<T, R>(condition: () => boolean, thenSource?: Observable<T>, elseSource?: Observable<R>): Observable<T | R>;
    constructor(condition: () => boolean, thenSource?: Observable<T>, elseSource?: Observable<R>);
    protected _subscribe(subscriber: Subscriber<T | R>): Subscription | Function | void;
}

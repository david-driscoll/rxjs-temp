import { Observable } from '../Observable';
/**
 * Opens a buffer immediately, then closes the buffer when the observable
 * returned by calling `closingSelector` emits a value. It that immediately
 * opens a new buffer and repeats the process.
 *
 * <img src="./img/bufferWhen.png" width="100%">
 *
 * @param {function} closingSelector a function that takes no arguments and
 * returns an Observable that signals buffer closure.
 * @return {Observable<T[]>} an observable of arrays of buffered values.
 * @method bufferWhen
 * @owner Observable
 */
export declare function bufferWhen<T>(closingSelector: () => Observable<any>): Observable<T[]>;
export interface BufferWhenSignature<T> {
    (closingSelector: () => Observable<any>): Observable<T[]>;
}

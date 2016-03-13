System.register(['../../util/root', '../../util/tryCatch', '../../util/errorObject', '../../Observable', '../../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, tryCatch_1, errorObject_1, Observable_1, Subscriber_1;
    var createXHRDefault, AjaxObservable, AjaxSubscriber, AjaxResponse, AjaxError, AjaxTimeoutError;
    function defaultGetResultSelector(response) {
        return response.response;
    }
    function ajaxGet(url, resultSelector = defaultGetResultSelector, headers = null) {
        return new AjaxObservable({ method: 'GET', url: url, resultSelector: resultSelector, headers: headers });
    }
    exports_1("ajaxGet", ajaxGet);
    function ajaxPost(url, body, headers) {
        return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
    }
    exports_1("ajaxPost", ajaxPost);
    function ajaxDelete(url, headers) {
        return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
    }
    exports_1("ajaxDelete", ajaxDelete);
    function ajaxPut(url, body, headers) {
        return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
    }
    exports_1("ajaxPut", ajaxPut);
    function ajaxGetJSON(url, resultSelector, headers) {
        const finalResultSelector = resultSelector ? (res) => resultSelector(res.response) : (res) => res.response;
        return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', resultSelector: finalResultSelector, headers: headers });
    }
    exports_1("ajaxGetJSON", ajaxGetJSON);
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            createXHRDefault = () => {
                let xhr = new root_1.root.XMLHttpRequest();
                if (this.crossDomain) {
                    if ('withCredentials' in xhr) {
                        xhr.withCredentials = true;
                        return xhr;
                    }
                    else if (!!root_1.root.XDomainRequest) {
                        return new root_1.root.XDomainRequest();
                    }
                    else {
                        throw new Error('CORS is not supported by your browser');
                    }
                }
                else {
                    return xhr;
                }
            };
            ;
            ;
            ;
            ;
            ;
            class AjaxObservable extends Observable_1.Observable {
                constructor(urlOrRequest) {
                    super();
                    const request = {
                        async: true,
                        createXHR: createXHRDefault,
                        crossDomain: false,
                        headers: {},
                        method: 'GET',
                        responseType: 'json',
                        timeout: 0
                    };
                    if (typeof urlOrRequest === 'string') {
                        request.url = urlOrRequest;
                    }
                    else {
                        for (const prop in urlOrRequest) {
                            if (urlOrRequest.hasOwnProperty(prop)) {
                                request[prop] = urlOrRequest[prop];
                            }
                        }
                    }
                    this.request = request;
                }
                _subscribe(subscriber) {
                    return new AjaxSubscriber(subscriber, this.request);
                }
            }
            AjaxObservable.create = (() => {
                const create = (urlOrRequest) => {
                    return new AjaxObservable(urlOrRequest);
                };
                create.get = ajaxGet;
                create.post = ajaxPost;
                create.delete = ajaxDelete;
                create.put = ajaxPut;
                create.getJSON = ajaxGetJSON;
                return create;
            })();
            exports_1("AjaxObservable", AjaxObservable);
            class AjaxSubscriber extends Subscriber_1.Subscriber {
                constructor(destination, request) {
                    super(destination);
                    this.request = request;
                    this.done = false;
                    const headers = request.headers = request.headers || {};
                    if (!request.crossDomain && !headers['X-Requested-With']) {
                        headers['X-Requested-With'] = 'XMLHttpRequest';
                    }
                    if (!('Content-Type' in headers)) {
                        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                    }
                    request.body = this.serializeBody(request.body, request.headers['Content-Type']);
                    this.resultSelector = request.resultSelector;
                    this.send();
                }
                next(e) {
                    this.done = true;
                    const { resultSelector, xhr, request, destination } = this;
                    const response = new AjaxResponse(e, xhr, request);
                    if (resultSelector) {
                        const result = tryCatch_1.tryCatch(resultSelector)(response);
                        if (result === errorObject_1.errorObject) {
                            this.error(errorObject_1.errorObject.e);
                        }
                        else {
                            destination.next(result);
                        }
                    }
                    else {
                        destination.next(response);
                    }
                }
                send() {
                    const { request, request: { user, method, url, async, password, headers, body } } = this;
                    const createXHR = request.createXHR;
                    const xhr = tryCatch_1.tryCatch(createXHR).call(request);
                    if (xhr === errorObject_1.errorObject) {
                        this.error(errorObject_1.errorObject.e);
                    }
                    else {
                        this.xhr = xhr;
                        let result;
                        if (user) {
                            result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
                        }
                        else {
                            result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
                        }
                        if (result === errorObject_1.errorObject) {
                            this.error(errorObject_1.errorObject.e);
                            return;
                        }
                        xhr.timeout = request.timeout;
                        xhr.responseType = request.responseType;
                        this.setHeaders(xhr, headers);
                        this.setupEvents(xhr, request);
                        if (body) {
                            xhr.send(body);
                        }
                        else {
                            xhr.send();
                        }
                    }
                }
                serializeBody(body, contentType) {
                    if (!body || typeof body === 'string') {
                        return body;
                    }
                    const splitIndex = contentType.indexOf(';');
                    if (splitIndex !== -1) {
                        contentType = contentType.substring(0, splitIndex);
                    }
                    switch (contentType) {
                        case 'application/x-www-form-urlencoded':
                            return Object.keys(body).map(key => `${key}=${encodeURI(body[key])}`).join('&');
                        case 'application/json':
                            return JSON.stringify(body);
                    }
                }
                setHeaders(xhr, headers) {
                    for (let key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            xhr.setRequestHeader(key, headers[key]);
                        }
                    }
                }
                setupEvents(xhr, request) {
                    const progressSubscriber = request.progressSubscriber;
                    xhr.ontimeout = function xhrTimeout(e) {
                        const { subscriber, progressSubscriber, request } = xhrTimeout;
                        if (progressSubscriber) {
                            progressSubscriber.error(e);
                        }
                        subscriber.error(new AjaxTimeoutError(this, request));
                    };
                    xhr.ontimeout.request = request;
                    xhr.ontimeout.subscriber = this;
                    xhr.ontimeout.progressSubscriber = progressSubscriber;
                    if (xhr.upload && 'withCredentials' in xhr && root_1.root.XDomainRequest) {
                        if (progressSubscriber) {
                            xhr.onprogress = function xhrProgress(e) {
                                const { progressSubscriber } = xhrProgress;
                                progressSubscriber.next(e);
                            };
                            xhr.onprogress.progressSubscriber = progressSubscriber;
                        }
                        xhr.onerror = function xhrError(e) {
                            const { progressSubscriber, subscriber, request } = xhrError;
                            if (progressSubscriber) {
                                progressSubscriber.error(e);
                            }
                            subscriber.error(new AjaxError('ajax error', this, request));
                        };
                        xhr.onerror.request = request;
                        xhr.onerror.subscriber = this;
                        xhr.onerror.progressSubscriber = progressSubscriber;
                    }
                    xhr.onreadystatechange = function xhrReadyStateChange(e) {
                        const { subscriber, progressSubscriber, request } = xhrReadyStateChange;
                        if (this.readyState === 4) {
                            let status = this.status === 1223 ? 204 : this.status;
                            let response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                            if (status === 0) {
                                status = response ? 200 : 0;
                            }
                            if (200 <= status && status < 300) {
                                if (progressSubscriber) {
                                    progressSubscriber.complete();
                                }
                                subscriber.next(e);
                                subscriber.complete();
                            }
                            else {
                                if (progressSubscriber) {
                                    progressSubscriber.error(e);
                                }
                                subscriber.error(new AjaxError('ajax error ' + status, this, request));
                            }
                        }
                    };
                    xhr.onreadystatechange.subscriber = this;
                    xhr.onreadystatechange.progressSubscriber = progressSubscriber;
                    xhr.onreadystatechange.request = request;
                }
                unsubscribe() {
                    const { done, xhr } = this;
                    if (!done && xhr && xhr.readyState !== 4) {
                        xhr.abort();
                    }
                    super.unsubscribe();
                }
            }
            exports_1("AjaxSubscriber", AjaxSubscriber);
            class AjaxResponse {
                constructor(originalEvent, xhr, request) {
                    this.originalEvent = originalEvent;
                    this.xhr = xhr;
                    this.request = request;
                    this.status = xhr.status;
                    this.responseType = xhr.responseType;
                    switch (this.responseType) {
                        case 'json':
                            if ('response' in xhr) {
                                this.response = xhr.response;
                            }
                            else {
                                this.response = JSON.parse(xhr.responseText || '');
                            }
                            break;
                        case 'xml':
                            this.response = xhr.responseXML;
                            break;
                        case 'text':
                        default:
                            this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
                            break;
                    }
                }
            }
            exports_1("AjaxResponse", AjaxResponse);
            class AjaxError extends Error {
                constructor(message, xhr, request) {
                    super(message);
                    this.message = message;
                    this.xhr = xhr;
                    this.request = request;
                    this.status = xhr.status;
                }
            }
            exports_1("AjaxError", AjaxError);
            class AjaxTimeoutError extends AjaxError {
                constructor(xhr, request) {
                    super('ajax timeout', xhr, request);
                }
            }
            exports_1("AjaxTimeoutError", AjaxTimeoutError);
        }
    }
});

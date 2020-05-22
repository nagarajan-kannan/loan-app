import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { STORAGE } from '../constants/storage.constant';

@Injectable({
    providedIn: 'root'
})
export class RESTInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let token = null;

        // If it is not auth rest call, then add authorization token
        if (!request.url.includes('/auth')) {
            token = JSON.parse(sessionStorage.getItem(STORAGE.USER_DATA))?.token;
        }

        let clonedRequest = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'Authorization': token || 'Authentication Token' // Token Placeholder
            }
        });

        return next.handle(clonedRequest).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with respose, if you want
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // Interceptor error handling, If you want
                    if (clonedRequest.method !== 'GET' && err.status >= 400) {

                    } else {

                    }
                }
            })
        );
    }

}

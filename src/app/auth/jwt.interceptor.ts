import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const isLoggedIn = this.authService.isAuth();
        const isApiUrl = request.url.startsWith(environment.baseUrl);
        //alert('JWT Interceptor');
        if (isLoggedIn && isApiUrl) {
            const token=localStorage.getItem('access-token')
            request = request.clone({
                setHeaders: { 'access-token': `${token}` }
            });
        }

        return next.handle(request);
    }
}
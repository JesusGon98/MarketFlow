import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class StoreInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.startsWith(environment.apiUrl) || req.params.has('storeId')) {
      return next.handle(req);
    }

    const storeReq = req.clone({
      setParams: { storeId: environment.storeId },
    });

    return next.handle(storeReq);
  }
}

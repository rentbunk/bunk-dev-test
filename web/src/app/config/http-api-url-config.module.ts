import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environment/environment';

@Injectable()
export class HttpApiUrlInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // modify the request
    request = request.clone({
      url: environment.API_URL + request.url,
    });
    // pass the request to the next handler
    return next.handle(request);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiUrlInterceptor,
      multi: true,
    },
  ],
})
export class HttpApiUrlConfigModule {}

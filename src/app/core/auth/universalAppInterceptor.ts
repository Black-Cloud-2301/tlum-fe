import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, throwError} from "rxjs";

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    const authRequest = req.clone({
      url: req.url,
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.authService.refreshToken().subscribe({
              next: data => {
                localStorage.setItem('access-token', data.accessToken);

                const updatedRequest = req.clone({
                  url: req.url,
                  headers: req.headers.set('Authorization', 'Bearer ' + data.accessToken)
                });
                return next.handle(updatedRequest);
              },
              error: error => {
                if(error.status === 403) {
                  localStorage.removeItem('refresh-token');
                }
                console.log(error)
              }

            });
          }
          return throwError(() => new Error(error.message))
        }
      ))
  }
}



import {Injectable} from '@angular/core';
import {LoginRequest} from "../../models/auth/login";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {API} from "../../data/server-url";
import {TokenResponse} from "../../models/auth/tokenResponse";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {setUser} from "../../shared/store/user.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private store: Store) {
  }

  getToken(): string {
    const token = localStorage.getItem('access-token')
    if (!token) {
      const refreshToken = localStorage.getItem('refresh-token')
      if (refreshToken) {
        this.refreshToken().subscribe({
          next: data => {
            localStorage.setItem('access-token', data.accessToken);
            return data.accessToken;
          },
          error: error => {
            if (error.status === 403) {
              localStorage.removeItem('refresh-token');
            }
            console.log(error)
          }
        });
      }
    }
    return token ? token : '';
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = localStorage.getItem('refresh-token')
    const refreshTokenUrl = environment.apiUrl + API.REFRESH_TOKEN;

    return this.http.post<TokenResponse>(refreshTokenUrl, {refreshToken: refreshToken})
  }

  login(data: LoginRequest) {
    const loginUrl = environment.apiUrl + API.LOGIN;

    return this.http.post<TokenResponse>(loginUrl, data).subscribe({
      next: data => {
        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.store.dispatch(setUser({user: data.user}));
        this.router.navigate(['/']).then(r => console.log(r));
      },
      error: error => console.log(error)
    });
  }

  getUserInfo() {
    const user = localStorage.getItem('user');
    if(!user) {
      this.logout();
    }
    return user ? JSON.parse(user) : null;
  }


  logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('user');
  }
}

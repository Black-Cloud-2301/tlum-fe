import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const url = route.url.map(segment => segment.path).join('/')
  if(url === 'login') {
    console.log('guard',authService.getToken())
    if(authService.getToken()) {
      router.navigate(['/']).then(r => console.log(r));
      return false;
    }
    return true;
  }

  if(authService.getToken()) {
    return true;
  } else {
    router.navigate(['/login']).then(r => console.log(r));
    return false;
  }
}

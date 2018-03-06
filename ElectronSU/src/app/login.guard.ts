import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './pages/login/auth.service'
@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private auth:AuthService, private router:Router){}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('login guard called');
        console.log("this.auth.isAuthenticated: "+ this.auth.isAuthenticated)
        if(this.auth.isAuthenticated ==false){
            console.log('LoginGaurd is not blocking login route');
            return true;
        }else{
            console.log('LoginGaurd is blocking login route');
            this.router.navigate(['/pages/sudblander']);
            return false;
        }
    }

}

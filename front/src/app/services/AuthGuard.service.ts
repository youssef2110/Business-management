import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  user = JSON.parse(localStorage.getItem("user"));

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.user === null) {
      this.user = {Etat : false}
    } 
    if(this.user.Etat) {
      return true;
    } else {
      this.router.navigate(['/home']);
      
    }
  }
  
}


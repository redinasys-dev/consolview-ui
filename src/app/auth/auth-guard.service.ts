import { Injectable } from "@angular/core";

import { CanLoad,CanActivate, Router, Route, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate{
  constructor(private router: Router, private authService:AuthService) {
  }
 
  canLoad(route: Route): boolean {

    const allowedRoles=route.data['allowedRoles'];
    const customer_type=localStorage.getItem('customer_type');

    if(!this.authService.isAuth() || !allowedRoles.includes(customer_type)){
        this.router.navigate(['/auth/login']);
        return false;
    }

    
    
    //determine whether you want to load the module
    //return true or false
 
    return true; 
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if(!this.authService.isAuth()){
        this.router.navigate(['/auth/login']);
        return false;
    }

    
    
    //determine whether you want to load the module
    //return true or false
 
    return true; 
  }

 
} 

 
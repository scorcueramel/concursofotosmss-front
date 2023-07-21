import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn:'root',
})
export class AuthAdmin implements CanActivate {
  constructor(
    private authService : AuthService,
    private router : Router
  ){ }

  canActivate(): boolean {
    if(this.authService.isAdmin())
    {
      this.router.navigate(['/menu/inicio/portada']);
      return false
    }else{
      return true;
    }
  }
}

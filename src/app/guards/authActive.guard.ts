import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthActive implements CanActivate{

  constructor(
    private authService : AuthService,
    private router: Router
  ){}

  canActivate(): boolean{
    if(this.authService.isAuth())
    {
      this.router.navigate(['/menu/inicio/portada']);
      return true;
    }else{
      return true;
    }
  }
}

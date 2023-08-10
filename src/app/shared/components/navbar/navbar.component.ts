import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.validForAll();
    this.validAdmin();
  }

  validForAll():void{
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-microsoft',
        routerLink: '/menu/inicio/portada'
      },
      {
        label: 'Album',
        icon: 'pi pi-folder',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-plus-circle',
            routerLink: '/menu/inicio/albunes/nuevo'
          },
          {
            label: 'Publicos',
            icon: 'pi pi-folder-open',
            routerLink: '/menu/inicio/albunes/publicados'
          },
          {
            label: 'Ocultos',
            icon: 'pi pi-minus-circle',
            routerLink: '/menu/inicio/albunes/ocultos'
          },
        ],
      }
    ];
  }

  validAdmin():void {
    if (localStorage.getItem('rol') == 'Administrador') {
      this.items?.push({
        label: 'Usuario',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/menu/inicio/usuarios/crear'
          },
          {
            label: 'Usuarios (todos)',
            icon: 'pi pi-fw pi-users',
            routerLink: '/menu/inicio/usuarios/todos'
          },
        ],
      });
    }
  }

  constructor(
    private _authService: AuthService,
    private router: Router,
    ){}

  logOut():void{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',`Bearer ${localStorage.getItem('token')}`);

    this._authService.authLogOut({headers:headers}).subscribe({
      next: (resp:any)=>{
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        console.log(resp.message);
      },
      error: (err:any)=>{
        console.log(err);
      }
    });
  }

}

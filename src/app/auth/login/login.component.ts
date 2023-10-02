import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  usuario: User = {
    username: '',
    password: '',
  };

  constructor(
    private messageService: MessageService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this._authService.authLogin(this.usuario).subscribe({
      next: (resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('rol', resp.rol);
        localStorage.setItem('name', resp.name);

        this.router.navigate(['/menu/inicio/portada']);
      },
      error: (err: any) => {
        this.show(
          'Oooppps!',
          'error',
          `${err.error.error}`,
          ', confirmar que tu nombre de usuario y contraseña sean correctos'
        );
      },
    });
  }

  show(summary: any, severity: any, mensaje: any, name: any) {
    this.messageService.add({
      severity: `${severity}`,
      summary: `${summary}`,
      detail: `${mensaje} ${name}`,
    });
  }
}

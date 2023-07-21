import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { SwalService } from 'src/app/services/swal.service';


@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
  providers: [MessageService],
})
export class NuevoUsuarioComponent implements OnInit {

  // Data del formulario y validaciones
  datosUsuario = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(25),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private swalService : SwalService
  ) {}

  ngOnInit(): void {
  }

  volver():void {
    this.router.navigate(['/menu/inicio/usuarios/todos']);
  }

  onRegister():void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.swalService.wait();

    this.authService
      .registerUser(this.datosUsuario.value, { headers: headers })
      .subscribe({
        next: (resp: any) => {
            this.show(
              'Usuario Creado',
              'success',
              'Se creo el nuevo usuario  ',
              ` ${resp.name}`
              );
            this.swalService.close();
            this.datosUsuario.reset();
            console.log(resp);
        },
        error: (err) => {
          console.log(err);
          this.swalService.close()
          this.show(
            'Oooppsss!',
            'error',
            ``,
            `El usuario ${this.datosUsuario.value.username} ya se encuentra registrado`
            );
        },
      });
  }

  show(summary: any, severity: any, mensaje: any, name: any):void {
    this.messageService.add({
      severity: `${severity}`,
      summary: `${summary}`,
      detail: `${mensaje} ${name}`,
    });
  }

  limpiarCajas():void{

  }

}

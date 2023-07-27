import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ListaUsuariosComponent implements OnInit {
  position: string = 'center';

  userDialog: boolean = false;
  usuarios!: User[];

  submitted: boolean = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }


  obtenerUsuarios(): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.userService.getAllusers({ headers: headers }).subscribe({
      next: (data: any) => {
        this.usuarios = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  nuevoUsuario(): void {
    this.router.navigate(['/menu/inicio/usuarios/crear']);
  }

  editarUsuario(id: number){
    this.router.navigate([`/menu/inicio/usuarios/editar/${id}`])
  }

  eliminarUsuario(position: string, usuario: User) {
    this.position = position;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.confirmationService.confirm({
      message: `Seguro de eliminar al usuario ${usuario.name}?`,
      header: 'Eliminar Usuario?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.dropUser({ headers: headers }, usuario.id).subscribe({
          next: (resp: any) => {
            console.log(resp.message);
            this.obtenerUsuarios();
            this.confirmar(resp.message);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'No eliminado',
              detail: 'Decidiste NO eliminar el usuario',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Anulaster la eliminación del usuario',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  confirmar(mensaje: any): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Eliminado',
      detail: `${mensaje}`,
    });
  }

  rechazar(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'No eliminado',
      detail: 'No se elimino el usuario',
    });
  }
}

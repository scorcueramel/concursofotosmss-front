import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

import { SwalService } from 'src/app/services/swal.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers: [MessageService]
})
export class EditarUsuarioComponent implements OnInit{
  id:number = this.activatedRoute.snapshot.params['id'];

  usuario:User[]=[];

  usuarioEditar:User = {
    id:0,
    name: '',
    username: '',
    password: ''
  }


  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private swalService: SwalService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
      this.obtenerUsuario(this.id);
  }

  obtenerUsuario(id:number):void{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.usersService.getOneUnser({headers:headers},id).subscribe({
      next: (resp:any) => {
        this.usuario = resp.usuario;
        this.usuario.map((data)=>{
          this.usuarioEditar = data;
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onEdit():void{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.swalService.wait();

    this.usersService.updatedUser({headers:headers},this.id,this.usuarioEditar).subscribe({
      next: (resp:any)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `${resp.message}`,
        });
        this.swalService.close();
      },
      error: (err:any)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'No Actualizado',
          detail: `${err.error.message}`,
        });
        this.swalService.close();
      }
    });
  }

  volver():void{
    this.router.navigate(['/menu/inicio/usuarios/todos']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-albums',
  templateUrl: './lista-albums.component.html',
  styleUrls: ['./lista-albums.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ListaAlbumsComponent implements OnInit {
  rutaURL = environment.apiUrlArchivos;

  nuevoDialogo: boolean = false;

  submited: boolean = false;

  albunes: Album[] = [];

  album: Album = {
    id: 0,
    nombre: '',
    portada: '',
    publicado: false,
    activo: false,
  };

  constructor(
    private albumService: AlbumService,
    private messageService: MessageService,
    private swalService: SwalService,
    private confirmationService: ConfirmationService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.obtenerAlbunes();
  }

  obtenerAlbunes(): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.albumService.getAllAlbums({ headers: headers }).subscribe({
      next: (resp: any) => {
        this.albunes = resp.albums;
        console.log(resp.albums);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  deleteProduct(album:Album) {
    this.confirmationService.confirm({
      message: `Seguro de elimar el albúm ${album.nombre}?`,
      header: 'Elimar Albúm?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        );
        this.swalService.wait();
        this.albumService.deleteAlbum({ headers: headers }, album.id).subscribe({
          next: (resp: any) => {
            this.swalService.close();
            console.log(resp);
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: `${resp.message}`,
              life: 3000,
            });
            this.obtenerAlbunes();
          },
          error: (err: any) => {
            this.swalService.close();
            this.messageService.add({
              severity: 'error',
              summary: 'No Eliminado',
              detail: `${err.error.message}`,
              life: 3000,
            });
            console.log(err);
          },
        });
      },
    });
  }

  nuevoAlbum():void{
    this.router.navigate(['/menu/inicio/albunes/nuevo']);
  }
}

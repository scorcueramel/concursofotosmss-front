import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-albunes-ocultos',
  templateUrl: './lista-albunes-ocultos.component.html',
  styleUrls: ['./lista-albunes-ocultos.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ListaAlbunesOcultosComponent {
  responsiveOptions: any[] | undefined;

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerAlbunes();
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  obtenerAlbunes(): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.albumService.getInactivesAlbums({ headers: headers }).subscribe({
      next: (resp: any) => {
        this.albunes = resp.albums;
        console.log(resp.albums);
        this.swalService.close();
      },
      error: (err: any) => {
        console.log(err.error);
        this.swalService.close();
      },
    });
  }

  deleteAlbum(album: Album):void{
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
        this.albumService
          .deleteAlbum({ headers: headers }, album.id)
          .subscribe({
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

  publicar(id: number, nombre: string):void{
    this.confirmationService.confirm({
      message: `Deseas publicar el albúm ${nombre}?`,
      header: 'Publicar?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        );
        this.swalService.wait();
        this.albumService
          .publicateAlbum({ headers: headers }, id)
          .subscribe({
            next: (resp: any) => {
              this.swalService.close();
              console.log(resp);
              this.messageService.add({
                severity: 'success',
                summary: 'Publicado',
                detail: `${resp.message}`,
                life: 2000,
              });
              this.obtenerAlbunes();
            },
            error: (err: any) => {
              this.swalService.close();
              this.messageService.add({
                severity: 'error',
                summary: 'No Publicado',
                detail: `${err.error.message}`,
                life: 3000,
              });
              console.log(err);
            },
          });
      },
    });
  }
}

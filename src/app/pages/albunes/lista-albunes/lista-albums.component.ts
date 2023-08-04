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
  responsiveOptions: any[] | undefined;

  rutaURL = environment.apiUrlArchivos;

  nuevoDialogo: boolean = false;

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
    this.albumService.getAactivesAlbums({ headers: headers }).subscribe({
      next: (resp: any) => {
        this.albunes = resp.albums;
        console.log(this.albunes);
        this.swalService.close();
      },
      error: (err: any) => {
        console.log(err.error);
        this.swalService.close();
      },
    });
  }

  deleteAlbum(album: Album) {
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
                severity: resp.severity,
                summary: resp.summary,
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

  nuevoAlbum(): void {
    this.router.navigate(['/menu/inicio/albunes/nuevo']);
  }

  editarAlbum(id:any): void{
    this.router.navigate([`/menu/inicio/albunes/editar/${id}`]);
  }

  ocultar(id: number, nombre: string):void{
    this.confirmationService.confirm({
      message: `Deseas despublicar el albúm ${nombre}?`,
      header: 'Ocultar?',
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
          .dePublicateAlbum({ headers: headers }, id)
          .subscribe({
            next: (resp: any) => {
              this.swalService.close();
              console.log(resp);
              this.messageService.add({
                severity: resp.severity,
                summary: resp.summary,
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

  agregarFoto(id:number,nombre:string):void{
    this.router.navigate([`/menu/inicio/fotos/lista/${id}/${nombre}`])
  }

  ocultos():void{
    this.router.navigate(['/menu/inicio/albunes/ocultos']);
  }
}

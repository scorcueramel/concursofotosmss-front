import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foto } from 'src/app/interfaces/foto';
import { FotoService } from 'src/app/services/foto.service';
import { environment } from 'src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-lista-fotos',
  templateUrl: './lista-fotos.component.html',
  styleUrls: ['./lista-fotos.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ListaFotosComponent implements OnInit {
  idAlbum: number = this.activatedRouter.snapshot.params['idAlbum'];

  nombre: string = this.activatedRouter.snapshot.params['nombre'];

  codigo!: number;
  mensaje!: string;
  modalFoto: boolean = false;

  responsiveOptions: any[] | undefined;

  rutaURL = environment.apiUrlArchivos;

  fotos: Foto[] = [];

  foto: Foto = {
    id: 0,
    nombre_participante: '',
    titulo: '',
    lugar: '',
    resenia: '',
    motivacion: '',
    archivo: '',
    activo: true,
    publicado: true,
    album_id: 0,
  };

  constructor(
    private activatedRouter: ActivatedRoute,
    private fotoService: FotoService,
    private router: Router,
    private swalService: SwalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerFotos();
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

  obtenerFotos(): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.fotoService
      .getPhotoForBook({ headers: headers }, this.idAlbum)
      .subscribe({
        next: (resp: any) => {
          this.codigo = resp.code;
          this.mensaje = resp.content;
          this.fotos = resp.content;
          this.swalService.close();
        },
        error: (err: any) => {
          this.swalService.close();
          console.log(err.error);
        },
      });
  }

  estadoFoto(id: number): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.fotoService.getOnePhoto({ headers: headers }, id).subscribe({
      next: (resp: any) => {
        this.foto = resp.content[0];
        this.cambioEstado(this.foto);
      },
      error: (err: any) => {
        console.log(err);
        this.swalService.close();
      },
    });
  }

  cambioEstado(foto: Foto) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    if(foto.publicado){
      this.fotoService.dePublicateFoto({headers:headers},this.foto.id).subscribe({
        next: (resp:any)=>{
          this.obtenerFotos();
          this.messageService.add({
            severity: resp.severity,
            summary: resp.summary,
            detail: `${resp.content}`,
            life: 2000,
          });
          console.log(resp);
        },
        error: (err:any)=>{
          console.log(err.error);
        }
      });
    }else{
      this.fotoService.publicateFoto({headers:headers},this.foto.id).subscribe({
        next: (resp:any)=>{
          this.obtenerFotos();
          this.messageService.add({
            severity: resp.severity,
            summary: resp.summary,
            detail: `${resp.content}`,
            life: 2000,
          });
          console.log(resp);
        },
        error: (err:any)=>{
          console.log(err.error);
        }
      });
    }

  }

  verDetalle(foto: Foto):void{
    this.foto = {...foto};
    this.modalFoto = true;
  }

  cerraModal():void{
    this.modalFoto = false;
  }

  nuevo() {
    this.router.navigate([`/menu/inicio/fotos/nuevo/${this.idAlbum}`]);
  }

  editarFoto(id:any): void{
    this.router.navigate([`/menu/inicio/fotos/editar/${id}`]);
  }
}

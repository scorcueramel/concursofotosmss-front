import { Component } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-album',
  templateUrl: './editar-album.component.html',
  styleUrls: ['./editar-album.component.css'],
  providers: [MessageService],
})
export class EditarAlbumComponent {
  id:number = this.activatedRouter.snapshot.params['id'];
  rutaURL = environment.apiUrlArchivos;

  constructor(
    private router: Router,
    private albumService: AlbumService,
    private swalService: SwalService,
    private messageService: MessageService,
    private activatedRouter: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.obtenerAlbum(this.id);
   }
  archivos = new Array();
  previsualizar = new Array();
  album: Album = {
    id:0,
    nombre: '',
    portada: '',
    publicado: true,
  };
  albumObtenido:Album[] = [];

  obtenerAlbum(id:number):void{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.albumService.getOneAlbum({headers:headers},id).subscribe({
      next: (resp:any) => {
        this.albumObtenido = resp.album;
        this.albumObtenido.map((data)=>{
          this.album = data;
          this.previsualizar.push(this.rutaURL+this.album.portada);
        });
        this.swalService.close();
      },
      error: (err:any) => {
        this.swalService.close();
        console.log(err.error);
      }
    });
  }

  processFiles(event: any): void {
    let headers = new Headers();
    // con esto enviar archivos y texto ENCTYPE
    headers.append('enctype', 'multipart/form-data;');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.swalService.wait();

    this.archivos.push(event.target.files);

    if (this.archivos.length > 0) {
      const formData: FormData = new FormData();
      formData.append(`portada`, this.archivos[0][0], this.archivos[0][0].name);

      this.previsualizacion(event);

      this.albumService.storeImage({ headers: headers }, formData).subscribe({
        next: (resp: any) => {
          this.album.portada = resp.archivo.filename;
          this.swalService.close();
        },
        error: (err: any) => {
          console.log(err.error);
          this.swalService.close();
        },
      });
    }
  }

  guardar(id:number) {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.albumService
      .updateAlbum({ headers: headers }, this.album, id)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.show(
            'Albúm Creado',
            'success',
            'Se creo el nuevo album  ',
            ''
            );
          this.swalService.close()
          setTimeout(()=>{
            this.router.navigate(['/menu/inicio/albunes/publicados']);
          },900);
        },
        error: (err: any) => {
          this.swalService.close()
          this.show(
            'No Creado',
            'error',
            'No se pudo crear el albúm contacte con soporte  ',
            ''
            );
          console.log(err.error);
        },
      });
  }

  previsualizacion(file: any): void {
    let archivos = file.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onload = () => {
      this.previsualizar.pop();
      this.previsualizar.push(reader.result);
    };
  }

  eliminarFoto() {
    this.previsualizar = [];
    this.album.portada = '';
  }

  volver(): void {
    this.router.navigate(['/menu/inicio/albunes/publicados']);
  }

  show(summary: any, severity: any, mensaje: any, name: any):void {
    this.messageService.add({
      severity: `${severity}`,
      summary: `${summary}`,
      detail: `${mensaje} ${name}`,
    });
  }
}

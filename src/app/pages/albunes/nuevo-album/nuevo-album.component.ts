import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-nuevo-album',
  templateUrl: './nuevo-album.component.html',
  styleUrls: ['./nuevo-album.component.css'],
  providers: [MessageService],
})
export class NuevoAlbumComponent implements OnInit {
  constructor(
    private router: Router,
    private albumService: AlbumService,
    private swalService: SwalService,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {  }

  archivos = new Array();
  imagen!: string;
  previsualizar = new Array();
  album: Album = {
    nombre: '',
    portada: '',
    publicado: true,
  };

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
          console.log(resp);
          this.swalService.close();
        },
        error: (err: any) => {
          console.log(err.error);
          this.swalService.close();
        },
      });
    }
  }

  guardar() {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.albumService
      .registerAlbum({ headers: headers }, this.album)
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
  }

  volver(): void {
    this.router.navigate(['/menu/inicio/albunes/todos']);
  }

  show(summary: any, severity: any, mensaje: any, name: any):void {
    this.messageService.add({
      severity: `${severity}`,
      summary: `${summary}`,
      detail: `${mensaje} ${name}`,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
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
  public archivos: any = [];
  public previsualiza!: string;
  public fileTmp: any;
  public body = new FormData();

  album: Album = {
    nombre: '',
  };

  constructor(
    private router: Router,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private albumService: AlbumService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {}

  onSelectFile(event: any) {
    const archivoCapturado = event.target.files[0];

    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualiza = imagen.base;
    });

    this.archivos.push(archivoCapturado);

    this.fileTmp = {
      fileRaw: this.archivos[0],
      fileName: this.archivos[0].name,
    };
  }

  // onSelectFile(event: any): any {

  //   const archivoCapturado = event.target.files[0];

  //   this.extraerBase64(archivoCapturado).then((imagen: any) => {
  //     this.previsualiza = imagen.base;
  //   });

  //   this.archivos.push(archivoCapturado);

  // }

  // onRegister() {
  //   let headers = new Headers();

  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

  //   this.body.append('nombre', this.album.nombre);
  //   this.body.append('portada', this.fileTmp.fileRaw,this.fileTmp.fileName);

  //   this.albumService.registerAlbum({ headers: headers }, this.body).subscribe({
  //     next: (resp: any) => {
  //       console.log(resp);
  //     },
  //     error: (err): any => {
  //       console.log(err);
  //     },
  //   });
  // }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve): void => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (error) {
        error;
      }
    });

  volver(): void {
    this.router.navigate(['/menu/inicio/albunes/todos']);
  }
}

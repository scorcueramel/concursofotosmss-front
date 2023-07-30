import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css'],
})
export class AddAlbumComponent implements OnInit {
  archivos = new Array();
  imagen!: string;
  previsualizar = new Array();;
  album: Album = {
    nombre: '',
    portada: '',
    publicado: true,
  };

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {}

  processFiles(event: any): void {
    let headers = new Headers();
    // con esto enviar archivos y texto ENCTYPE
    headers.append('enctype', 'multipart/form-data;');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.archivos.push(event.target.files);

    if (this.archivos.length > 0) {
      const formData: FormData = new FormData();
      formData.append(`portada`, this.archivos[0][0], this.archivos[0][0].name);

      this.previsualizacion(event);

      this.albumService.storeImage({ headers: headers }, formData).subscribe({
        next: (resp: any) => {
          this.album.portada = resp.archivo.filename
          console.log(resp);
        },
        error: (err: any) => {
          console.log(err.error);
        },
      });
    }
  }

  guardar() {
    let headers = new Headers();
    headers.append('content-type', 'application/json')
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.albumService.registerAlbum({headers:headers},this.album).subscribe({
      next: (resp:any)=>{
        console.log(resp);
      },
      error: (err:any)=>{
        console.log(err.error);
      }
    });
  }

  previsualizacion(file: any):void{
    let archivos = file.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onload = () => {
      this.previsualizar.pop();
      this.previsualizar.push(reader.result);
    }
  }

  eliminarFoto() {
    this.imagen = '';
  }
}

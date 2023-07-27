import { Component } from '@angular/core';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css'],
})
export class AddAlbumComponent {
  public selectedFile: File = null;
  nombre: string;
  portada: string;

  constructor(private _albumService: AlbumService) {}

  cargarImagen(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
  guardarAlbum() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this._albumService
      .processFile({ headers: headers }, this.selectedFile)
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Foto } from 'src/app/interfaces/foto';
import { FotoService } from 'src/app/services/foto.service';
import { SwalService } from 'src/app/services/swal.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nuevo-foto',
  templateUrl: './nuevo-foto.component.html',
  styleUrls: ['./nuevo-foto.component.css'],
  providers: [MessageService],
})
export class NuevoFotoComponent implements OnInit{
  idAlbum: number = this.activatedRouter.snapshot.params['idAlbum'];
  autoResize!:true;
  publicado:boolean = true;
  maxSize:number = 300000

  previsualizar = new Array();
  archivos = new Array();

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
    album_id: this.idAlbum,
  };

  constructor(
    private activatedRouter: ActivatedRoute,
    private swalService : SwalService,
    private fotoService: FotoService,
    private location: Location,
    private messageService: MessageService
  ){}

  ngOnInit(): void { }

  guardar():void{
    let headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.fotoService.registerFoto({headers:headers}, this.foto).subscribe({
      next: (resp: any) => {
        this.show(
          'Registro Creado',
          'success',
          'Se registro una nueva foto ',
          ''
          );
        this.swalService.close()
        setTimeout(()=>{
          this.volver();
        },500);
        console.log(resp);
      },
      error: (err: any) => {
        this.swalService.close();
        console.log(err.error);
        this.show(
          'No Registrada',
          'error',
          'No se pudo registrar la foto, contacte con soporte  ',
          ''
          );
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

      this.fotoService.storeImage({ headers: headers }, formData).subscribe({
        next: (resp: any) => {
          this.foto.archivo = resp.archivo.filename;
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

  previsualizacion(file: any): void {
    let archivos = file.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onload = () => {
      this.previsualizar.pop();
      this.previsualizar.push(reader.result);
    };
  }

  quitarImagen():void{
    this.previsualizar = [];
    this.archivos = [];
  }

  volver(){
    this.location.back();
  }

  show(summary: any, severity: any, mensaje: any, name: any):void {
    this.messageService.add({
      severity: `${severity}`,
      summary: `${summary}`,
      detail: `${mensaje} ${name}`,
    });
  }
}

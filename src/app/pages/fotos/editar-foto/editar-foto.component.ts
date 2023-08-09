import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Foto } from 'src/app/interfaces/foto';
import { Location } from '@angular/common';
import { FotoService } from 'src/app/services/foto.service';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-foto',
  templateUrl: './editar-foto.component.html',
  styleUrls: ['./editar-foto.component.css'],
  providers: [MessageService]
})
export class EditarFotoComponent implements OnInit{
  idFoto: number = this.activatedRouter.snapshot.params['idFoto'];
  rutaURL = environment.apiUrlArchivos;

  constructor(
    private activatedRouter: ActivatedRoute,
    private swalService: SwalService,
    private fotoService: FotoService,
    private messageService: MessageService,
    private location: Location,
  ){}

  previsualizar = new Array();
  archivos = new Array();

  autoResize!:true;
  publicado:boolean = true;
  maxSize:number = 300000

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
  };
  fotoObtenida:Foto[] = [];

  ngOnInit(): void {
    this.obtenerFoto(this.idFoto);
  }

  obtenerFoto(id:number):void{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.fotoService.getOnePhoto({headers:headers},id).subscribe({
      next: (resp:any)=>{
        this.fotoObtenida = resp.content;
        this.fotoObtenida.map((data)=>{
          this.foto = data;
          this.previsualizar.push(this.rutaURL+this.foto.archivo);
        });
        this.swalService.close();
      },
      error: (err:any) => {
        this.swalService.close();
        console.log(err.error);
      }
    });
  }

  guardar(id:number) {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    this.swalService.wait();
    this.fotoService
      .updateFoto({ headers: headers }, this.foto, id)
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
            this.location.back();
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

  volver():void{
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

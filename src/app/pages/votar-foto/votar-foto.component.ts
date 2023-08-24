import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foto } from 'src/app/interfaces/foto';
import { Reaccion } from 'src/app/interfaces/reaccion';
import { FotoService } from 'src/app/services/foto.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api'



@Component({
  selector: 'app-votar-foto',
  templateUrl: './votar-foto.component.html',
  styleUrls: ['./votar-foto.component.css'],
  providers: [MessageService],
})
export class VotarFotoComponent implements OnInit {
  id: number = this.activateRouter.snapshot.params['id'];
  rutaURL = environment.apiUrlArchivos;
  reaccionPorIp = new Array();
  ipObtenido: string;
  foto: Foto = {
    id: 0,
    nombre_participante: '',
    titulo: '',
    lugar: '',
    resenia: '',
    motivacion: '',
    archivo: '',
    activo: false,
    publicado: false,
    album_id: 0,
  };
  reacciones: Reaccion[] = [];
  reaccion: boolean;
  contResp: number = 0;

  constructor(
    private location: Location,
    private activateRouter: ActivatedRoute,
    private swalService: SwalService,
    private fotoService: FotoService,
    private reactionService: ReactionService,
  ) {}

  ngOnInit(): void {
    this.obtenerFoto(this.id);
  }

  obtenerFoto(id: number): void {
    this.swalService.wait();

    this.reactionService.getIpReacction().subscribe({
      next: (res: any) => {
        this.ipObtenido = res[0].terminal_ip;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });

    this.fotoService.getOnePhotoPublic(id).subscribe({
      next: (resp: any) => {
        this.foto = resp.content[0];
        this.reaccionPorIp = resp.ip;

        this.reaccionPorIp.forEach((e) => {
          if (e.terminal_ip == this.ipObtenido) {
            this.reaccion = e.tipo_reaccion;
          }
        });
      },
      error: (err: any) => {
        console.log(err.error);
        this.swalService.close();
      },
    });

    this.reactionService.getReactionsCount(id).subscribe({
      next: (resp: any) => {
        this.contResp = resp[0].conteo;
        this.swalService.close();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  reaccionar(idFoto: number, idReaccion: number): void {
    this.reactionService.reactions(idFoto, idReaccion).subscribe({
      next: (resp: any) => {
        this.obtenerFoto(idFoto);
      },
      error: (err: any) => {
        console.log(err.errror);
      },
    });
  }

  volver(): void {
    this.location.back();
  }
}

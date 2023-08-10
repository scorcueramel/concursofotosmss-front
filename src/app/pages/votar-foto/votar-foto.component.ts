import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foto } from 'src/app/interfaces/foto';
import { Reaccion } from 'src/app/interfaces/reaccion';
import { FotoService } from 'src/app/services/foto.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-votar-foto',
  templateUrl: './votar-foto.component.html',
  styleUrls: ['./votar-foto.component.css'],
  providers: [MessageService],
})
export class VotarFotoComponent implements OnInit {
  id: number = this.activateRouter.snapshot.params['id'];
  rutaURL = environment.apiUrlArchivos;
  ipCliente: string;
  foto: Foto = {};
  reacciones: Reaccion[] = [];
  reaccion: boolean = false;
  contResp: number = 0;

  constructor(
    private location: Location,
    private activateRouter: ActivatedRoute,
    private swalService: SwalService,
    private fotoService: FotoService,
    private reactionService: ReactionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.obtenerFoto(this.id);
  }

  reaccionXIp(ip: string): void {
    this.reactionService.reacctionsIp(ip).subscribe({
      next: (res: any) => {
        this.reacciones = res;
        this.reacciones.forEach((e) => {
          if (e.foto_id == this.id) {
            this.reaccion = e.tipo_reaccion;
          }
        });
        this.swalService.close();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  obtenerFoto(id: number): void {
    this.swalService.wait();
    this.fotoService.getIpClient().subscribe({
      next: (resp: any) => {
        this.ipCliente = resp.ip;
        this.reaccionXIp(this.ipCliente);
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });

    this.fotoService.getOnePhotoPublic(id).subscribe({
      next: (resp: any) => {
        this.foto = resp.content[0];
      },
      error: (err: any) => {
        console.log(err.error);
        this.swalService.close();
      },
    });

    this.reactionService.getReactionsCount(id).subscribe({
      next: (resp: any) => {
        this.contResp = resp[0].conteo
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  reaccionar(idFoto: number, idReaccion: number, ipClient: string): void {
    this.reactionService.reactions(idFoto, idReaccion, ipClient).subscribe({
      next: (resp: any) => {
        this.obtenerFoto(idFoto);
        // Pendiente mostrar mensaje de respuesta a la reaccion
        // this.messageService.add({
        //   severity: resp.severity,
        //   summary: 'Excelente!',
        //   detail: resp.detail,
        // });

        console.log(resp);
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

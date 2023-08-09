import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Foto } from 'src/app/interfaces/foto';
import { FotoService } from 'src/app/services/foto.service';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fotos-publicas',
  templateUrl: './fotos-publicas.component.html',
  styleUrls: ['./fotos-publicas.component.css']
})
export class FotosPublicasComponent implements OnInit{
  id:number = this.activatedRoute.snapshot.params['id'];
  rutaURL = environment.apiUrlArchivos;

  items: MenuItem[] | undefined;

  fotos:Foto[]=[];

  constructor(
    private serviceFoto: FotoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private swalService: SwalService,
    private location : Location
    ){ }

    ngOnInit(): void {
      this.items = [
        {
          label: 'FOTOGRAFÍAS'
        }
      ]
      this.obtenerFotos(this.id);
    }

    obtenerFotos(id:number):void{
      this.swalService.wait();
      this.serviceFoto.getPublicFotosAlbum(id).subscribe({
        next: (resp:any)=>{
          this.fotos = resp.content;
          this.swalService.close();
        },error:(err:any)=>{
          this.swalService.close();
          console.log(err.error);
        }
      });
    }

    votarFoto(id:any):void{
      this.router.navigate([`publico/foto/${id}/votar`])
    }

    volver():void{
      this.location.back();
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Finalista } from 'src/app/interfaces/finalista';
import { FinalistasService } from 'src/app/services/finalistas.service';
import { SwalService } from 'src/app/services/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finalistas',
  templateUrl: './finalistas.component.html',
  styleUrls: ['./finalistas.component.css']
})
export class FinalistasComponent {
  rutaURL = environment.apiUrlArchivos;

  finalistas:Finalista[]=[];

  constructor(
    private finalistService: FinalistasService,
    private swalService: SwalService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.obtenerFinalistas();
  }

  obtenerFinalistas():void{
    this.swalService.wait();
    this.finalistService.getTopFinalist().subscribe({
      next:(resp:any)=>{
        this.finalistas = resp.content
        this.swalService.close();
      },
      error: (err:any)=>{
        console.log(err.error);
      }
    });
  }

  verFoto(id:number):void{
    this.router.navigate([`/publico/foto/${id}/votar`]);
  }

  irAlbunes(){
    this.router.navigate(['/menu/inicio/albunes/publicados']);
  }
}

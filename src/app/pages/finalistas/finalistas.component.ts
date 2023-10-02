import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Finalista } from 'src/app/interfaces/finalista';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router,
    private _auth:AuthService
  ){}

  ngOnInit(): void {
    this.obtenerFinalistas();
    this._auth.isAuth();
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

  irAlbunes(){
    this.router.navigate(['/menu/inicio/albunes/publicados']);
  }
}

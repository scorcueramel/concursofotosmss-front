import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/interfaces/album';
import { AlbumService } from 'src/app/services/album.service';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'primeng/api';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit{
  id:number = this.activatedRoute.snapshot.params['id'];
  rutaURL = environment.apiUrlArchivos;

  items: MenuItem[] | undefined;

  constructor(
    private serviceAlbum: AlbumService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private swalService: SwalService
  ){}

  ngOnInit(): void {
    this.obtenerAlbunes();
  }

  albums:Album[]=[];

  obtenerAlbunes():void{
    this.swalService.wait();
    this.serviceAlbum.getAlbumPublic().subscribe({
      next: (res:any)=>{
        this.albums = res.albums
        localStorage.setItem('ipCliente', res.ipClient);
        console.log(res);

        this.swalService.close();
      },
      error: (err:any)=>{
        this.swalService.close();
        console.log(err.error);
      }
    });
  }

  verFotos(id:number):void{
    this.router.navigate([`publico/fotos/${id}`])
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-fotos',
  templateUrl: './lista-fotos.component.html',
  styleUrls: ['./lista-fotos.component.css']
})
export class ListaFotosComponent implements OnInit{
  id:number = this.activatedRouter.snapshot.params['id'];
  nombre:string = this.activatedRouter.snapshot.params['nombre'];

  constructor(
    private activatedRouter: ActivatedRoute
  ){}

  ngOnInit(): void {
  }
}

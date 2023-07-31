import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-foto',
  templateUrl: './nuevo-foto.component.html',
  styleUrls: ['./nuevo-foto.component.css']
})
export class NuevoFotoComponent implements OnInit{
  id:number = this.activatedRouter.snapshot.params['id'];

  constructor(
    private activatedRouter: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.id
  }
}

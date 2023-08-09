import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { VotarFotoComponent } from './votar-foto.component';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    VotarFotoComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    MenubarModule,
    ImageModule,
    ToastModule
  ],
  exports:[
    VotarFotoComponent
  ]
})
export class VotarFotoModule { }

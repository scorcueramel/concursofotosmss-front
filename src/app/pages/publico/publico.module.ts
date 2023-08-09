import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoComponent } from './publico.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';



@NgModule({
  declarations: [
    PublicoComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    MenubarModule
  ],
  exports : [
    PublicoComponent
  ]
})
export class PublicoModule { }

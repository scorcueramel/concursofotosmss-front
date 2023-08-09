import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { FotosPublicasComponent } from './fotos-publicas.component';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [
    FotosPublicasComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    MenubarModule,
    ImageModule
  ],
  exports:[
    FotosPublicasComponent
  ]
})
export class FotosPublicasModule { }

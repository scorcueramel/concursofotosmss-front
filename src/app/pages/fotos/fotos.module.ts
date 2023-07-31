import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ListaFotosComponent } from './lista-fotos/lista-fotos.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [ListaFotosComponent],
  imports: [
    CommonModule,
  ],
  exports: [ListaFotosComponent]
})
export class FotosModule { }

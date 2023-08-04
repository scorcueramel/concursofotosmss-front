import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFotosComponent } from './lista-fotos/lista-fotos.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { NuevoFotoComponent } from './nuevo-foto/nuevo-foto.component';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [ListaFotosComponent,NuevoFotoComponent],
  imports: [
    CommonModule,
    CarouselModule,
    ConfirmDialogModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    BadgeModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    RadioButtonModule,
    FileUploadModule
  ],
  exports: [ListaFotosComponent,NuevoFotoComponent],
})
export class FotosModule {}

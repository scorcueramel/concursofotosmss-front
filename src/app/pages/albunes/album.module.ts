import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlbumsComponent } from './lista-albunes/lista-albums.component';
import { NuevoAlbumComponent } from './nuevo-album/nuevo-album.component';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ListaAlbunesOcultosComponent } from './lista-albunes-ocultos/lista-albunes-ocultos.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { EditarAlbumComponent } from './editar-album/editar-album.component';


@NgModule({
  declarations: [ListaAlbumsComponent, NuevoAlbumComponent, ListaAlbunesOcultosComponent, EditarAlbumComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    FileUploadModule,
    CarouselModule,
    InputSwitchModule,
    TooltipModule
  ],
  exports: [ListaAlbumsComponent, NuevoAlbumComponent, ListaAlbunesOcultosComponent, EditarAlbumComponent],
})
export class AlbumModule {}

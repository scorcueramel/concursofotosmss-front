import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlbumsComponent } from './lista-albunes/lista-albums.component';
import { NuevoAlbumComponent } from './nuevo-album/nuevo-album.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { AddAlbumComponent } from './add-album/add-album.component';


@NgModule({
  declarations: [ListaAlbumsComponent, NuevoAlbumComponent, AddAlbumComponent],
  imports: [
    CommonModule,
    CardModule,
    PanelModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    RadioButtonModule,
    FormsModule,
    FileUploadModule
  ],
  exports: [ListaAlbumsComponent, NuevoAlbumComponent],
})
export class AlbumModule {}

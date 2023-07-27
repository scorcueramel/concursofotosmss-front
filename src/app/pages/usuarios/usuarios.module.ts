import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    ListaUsuariosComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    FormsModule
  ],
  exports:[
    NuevoUsuarioComponent,
    ListaUsuariosComponent
  ]
})
export class UsuariosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalistasComponent } from './finalistas.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';




@NgModule({
  declarations: [
    FinalistasComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule
  ],
  exports:[
    FinalistasComponent
  ]
})
export class FinalistasModule { }

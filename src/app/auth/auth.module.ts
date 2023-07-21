import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { TooltipModule } from 'primeng/tooltip';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    CardModule,
    DialogModule,
    ChipsModule,
    TooltipModule
  ],
})
export class AuthModule {}

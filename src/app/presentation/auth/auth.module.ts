
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@sharedelements/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    ErrorpageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

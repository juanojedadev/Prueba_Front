import { MaterialModule } from './../../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '@sharedelements/components/components.module';
import { CharactersComponent } from './characters/characters.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    CharactersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class HomeModule { }

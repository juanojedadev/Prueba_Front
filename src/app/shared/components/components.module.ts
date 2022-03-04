import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@sharedelements/material/material.module';


@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
  ]
})
export class ComponentsModule { }

import { MaterialModule } from '@sharedelements/material/material.module';
import { CharacterService } from '@dataelements/services/character.service';
import { CharacterGateway } from '@coreelements/gateways/character.gateway';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '@coreelements/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: CharacterGateway,
      useClass: CharacterService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

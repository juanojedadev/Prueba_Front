import { CharactersComponent } from './characters/characters.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'welcome',
        component: MainComponent
      },
      {
        path: 'characters',
        component: CharactersComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/welcome'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

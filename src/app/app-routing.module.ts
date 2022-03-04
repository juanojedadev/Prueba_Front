import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./presentation/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./presentation/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

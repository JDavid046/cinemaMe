import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guard/check-login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./main/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'search-movie',
    loadChildren: () => import('./main/search-movie/search-movie.module').then( m => m.SearchMoviePageModule)
  },
  {
    path: 'detail-movie/:id',
    loadChildren: () => import('./main/detail-movie/detail-movie.module').then( m => m.DetailMoviePageModule)
  },
  {
    path: 'list-movie-status/:status',
    loadChildren: () => import('./main/list-movie-status/list-movie-status.module').then( m => m.ListMovieStatusPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMoviePageRoutingModule } from './search-movie-routing.module';

import { SearchMoviePage } from './search-movie.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMoviePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchMoviePage]
})
export class SearchMoviePageModule {}

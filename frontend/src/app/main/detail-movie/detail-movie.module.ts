import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMoviePageRoutingModule } from './detail-movie-routing.module';

import { DetailMoviePage } from './detail-movie.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMoviePageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetailMoviePage]
})
export class DetailMoviePageModule {}

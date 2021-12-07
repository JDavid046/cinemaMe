import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMovieStatusPageRoutingModule } from './list-movie-status-routing.module';

import { ListMovieStatusPage } from './list-movie-status.page';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMovieStatusPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListMovieStatusPage]
})
export class ListMovieStatusPageModule {}

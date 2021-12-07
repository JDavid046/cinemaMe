import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import { MoviesService } from 'src/app/shared/services/omdb.service';

@Component({
  selector: 'app-list-movie-status',
  templateUrl: './list-movie-status.page.html',
  styleUrls: ['./list-movie-status.page.scss'],
})
export class ListMovieStatusPage implements OnInit {

  statusFilms: any;
  userFilms:any[] = [];
  status: string;

  constructor(private route: ActivatedRoute,
    private cinemaSvc: CinemaService,
    private omdbSvc: MoviesService) { }      

  async ngOnInit() {
    const params = this.route.snapshot.paramMap.get('status'); 
    let cinemaStatus;
    switch (params) {
      case "towatch":
        cinemaStatus = "To Watch";
        break;
       
      case "ongoing":
        cinemaStatus = "On Going";
        break;
        
      case "finalized":
        cinemaStatus = "Finalized";
        break;
    }
    this.status = cinemaStatus;
    const cinemaFilms = await this.cinemaSvc.getFilmByStatus(params, this.cinemaSvc.getTokenId());    
    this.statusFilms = cinemaFilms;    

    this.statusFilms.forEach(element => {
      this.getMovies(element.filmId);
    });    

    for (let index = 0; index < this.userFilms.length; index++) {
      console.log(this.userFilms[index]);      
    }
  }

  async getMovies(filmId: number){
    const result = await this.omdbSvc.searchMovieByID(filmId);    
    this.userFilms.push(result);
  }

}

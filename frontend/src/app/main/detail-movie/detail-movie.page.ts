import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import { MoviesService } from 'src/app/shared/services/omdb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
})
export class DetailMoviePage implements OnInit {

  movie: any;
  toWatch: boolean = true;

  constructor(private route: ActivatedRoute,
    private movieService: MoviesService,
    private cinemaSvc: CinemaService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');    
    try {
      const result = await this.movieService.searchMovieByID(id);
      this.movie = result;      
      this.isFilmToWatch();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Algo salió mal: ${error}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  async isFilmToWatch(){
    const result = await this.cinemaSvc.getFilmByUser(this.movie.imdbID, this.cinemaSvc.getTokenId());
    if(!result) this.toWatch = false;
  }

  async addFilm(){
    let body = {
      "filmId": this.movie.imdbID,
      "userId": this.cinemaSvc.getTokenId(),
      "estadoFilm": "To Watch"
    };
          
    try {
      await this.cinemaSvc.addFilm(body);

      Swal.fire({        
        text: "The Film has been added succesfully.",
        icon: 'success',        
        confirmButtonColor: '#3085d6',                
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      }) 

     
      
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Something went wrong: ${error}`,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

}

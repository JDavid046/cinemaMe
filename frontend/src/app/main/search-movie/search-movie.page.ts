import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import { MoviesService } from 'src/app/shared/services/omdb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
})
export class SearchMoviePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  movies: any []=[];
  title = "";
  page=1;

  constructor(private movieService: MoviesService,
    private cinemaSvc: CinemaService) { }

  ngOnInit() {
  }

  async searchMovie(data){    
    if(data.toSearch == ''){
      Swal.fire(
        'Error',
        'Por favor introduzca un título a buscar.',
        'warning'
      )
    }
    else{
      this.title = data.toSearch;    
      this.page = 1;      
      try {        
        const result = await this.movieService.searchMovieByTitle(this.title, this.page);                
        this.movies = result.Search;
      } catch (error) {
        Swal.fire(
          'Error',
          `Algo salió mal.`,
          'warning'
        )
      }
      /**this.http.get<any>(`${environment.API}&s=${data.toSearch}&page=${this.page}`)
      .subscribe(res => this.movies = res.Search );**/
    }    
  }

  loadData(event) {
    setTimeout(() => {
      this.page +=1;      
      this.searchNextMovie();
      event.target.complete();

      //console.log(this.movies);
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.movies.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  async searchNextMovie(){
    try {
      const result = await this.movieService.searchMovieByTitle(this.title, this.page);
      for(let element of result.Search){        
        this.movies.push(element);
      }
    } catch (error) {
      Swal.fire(
        'Error',
        `Algo salió mal.`,
        'warning'
      )
    }        
    /**this.http.get<any>(`${environment.API}&s=${this.title}&page=${this.page}`)
    .subscribe(res => {
      for(let element of <any>res.Search){        
        this.movies.push(element);
      }      

    } );**/
  }

  /**scrollTop(){
    //console.log("entro");
    this.document.documentElement.scrollTop;
  }**/

}

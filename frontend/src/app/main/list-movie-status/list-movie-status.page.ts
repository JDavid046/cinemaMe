import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import { MoviesService } from 'src/app/shared/services/omdb.service';
import Swal from 'sweetalert2';

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
      this.getMovies(element.filmId, element);
    });    
    
  }

  async getMovies(filmId: number, array){
    const result = await this.omdbSvc.searchMovieByID(filmId);  
    result.estadoFilm = array.estadoFilm;
    result.fechaFin = array.fechaFin;
    result.fechaInicio = array.fechaInicio;
    result.temporadaActual = array.temporadaActual;  
    this.userFilms.push(result);    
  }

  updateStatusFilm(filmId: number, status: string, filmType: string){    

    try {

      let seasonNumber = "0";

      if(status == "On Going"){
        if(filmType == "series"){        

          Swal.fire({
            title: 'Enter season number:',
            input: 'number',
            inputAttributes: {
              autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,  
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              seasonNumber = result.value;            
              this.cinemaSvc.updateFilmStatus(this.cinemaSvc.getTokenId(), filmId.toString(), { "status": status, "currentSeason":seasonNumber });      
  
              this.displaySuccessMessage({
                "title": "Film Updated",
                "text": `Film Updated to ${status} Film.`
              });            
            }
          })        
        }  
        else if(filmType == "movie"){
            this.cinemaSvc.updateFilmStatus(this.cinemaSvc.getTokenId(), filmId.toString(), { "status": status, "currentSeason":seasonNumber });                
  
            this.displaySuccessMessage({
              "title": "Film Updated",
              "text": `Film Updated to ${status} Film.`
            });          
        }        
      }
      else if(status == "To Watch"){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You want to put this film as To Watch?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, I Do!',
          cancelButtonText: "No, I Don't!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
  
            this.cinemaSvc.updateFilmStatus(this.cinemaSvc.getTokenId(), filmId.toString(), { "status": status, "currentSeason":seasonNumber });                
  
            this.displaySuccessMessage({
              "title": "Film Updated",
              "text": `Film Updated as ${status} Film.`
            }); 
            
          }
        })
      }
      else if(status == "Finalized"){
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You want to put this film as Finalized?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, I Do!',
          cancelButtonText: "No, I Don't!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
  
            this.cinemaSvc.updateFilmStatus(this.cinemaSvc.getTokenId(), filmId.toString(), { "status": status, "currentSeason":seasonNumber });                
  
            this.displaySuccessMessage({
              "title": "Film Updated",
              "text": `Film Updated as ${status} Film.`
            }); 
            
          }
        })
      }

    } catch (error) {

      this.displayErrorMessage({
        "title": "Error!",
        "text": "Something Went Wrong"
      });
    }

  }

  deleteFromWatchList(filmId:string){
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.cinemaSvc.deleteFilm(this.cinemaSvc.getTokenId(),filmId, this.status);

          this.displaySuccessMessage({
            "title": "Deleted",
            "text": "The Film Has Been Deleted."
          });
          
        }
      })
    } catch (error) {
      this.displayErrorMessage({
        "title": "Error!",
        "text": "Something Went Wrong"
      });
    }

  }

  public editItem(){
    console.log("eeoo");
  }

  private displaySuccessMessage(message){
    Swal.fire({
      title: message.title,
      text: message.text,
      icon: 'success',        
      confirmButtonColor: '#3085d6',                
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
  }

  private displayErrorMessage(message){
    Swal.fire({
      title: message.title,
      text: message.text,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    constructor(private http: HttpClient,){}    

    searchMovieByTitle(title, page){
        const result = this.http.get<any>(`${environment.API_2}&s=${title}&page=${page}`).toPromise();                
        return result;
    }

    searchMovieByID(id){
        const result = this.http.get<any>(`${environment.API_2}&i=${id}`).toPromise();                
        return result;
    }
}
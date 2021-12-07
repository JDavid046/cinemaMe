import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';


const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
    private router: Router) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(authData: User):Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.API_1}/auth/login`, authData)
    .pipe(
      map((res: UserResponse) => {        
        this.saveToken(res.token, res.userId.toString());        
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(){
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);    
    (isExpired)? this.logout(): this.loggedIn.next(true);
  }

  public getTokenId(){    
    return localStorage.getItem('userId');
  }
  
  private saveToken(token:string, userId: string){
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private handleError(err): Observable<never>{
    let errorMessage = 'An error has accured hile retrieving data';    
    Swal.fire({
      title: 'Error!',
      text: err,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    return throwError(err);
  }

  addFilm(body){
    return this.http.post<any>(`${environment.API_1}/users/film`, body).toPromise();
  }

  getFilmByUser(filmId: string, userId: string){
    return this.http.get(`${environment.API_1}/users/film/${filmId}/${userId}`).toPromise();
  }

  getFilmByStatus(status:string, userId: string){      
    return this.http.get(`${environment.API_1}/users/film/status/${status}/${userId}`).toPromise();
  }
}

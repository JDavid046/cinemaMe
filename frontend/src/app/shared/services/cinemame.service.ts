import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import  Swal from 'sweetalert2';


const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(authData: User):Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.API_1}/auth/login`, authData)
    .pipe(
      map((res: UserResponse) => {        
        this.saveToken(res.token);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  private checkToken(){
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);    
    (isExpired)? this.logout(): this.loggedIn.next(true);
  }
  
  private saveToken(token:string){
    localStorage.setItem('token', token);
  }

  private handleError(err): Observable<never>{
    let errorMessage = 'An error has accured hile retrieving data';    
    Swal.fire({
      title: 'Error!',
      text: 'Incorrect Email or Password',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    return throwError(errorMessage);
  }
}

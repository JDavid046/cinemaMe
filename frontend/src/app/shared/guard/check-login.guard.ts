import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CinemaService } from '../services/cinemame.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private cinemaSvc: CinemaService){}

  canActivate(): Observable<boolean>{
    return this.cinemaSvc.isLogged.pipe(
      take(1),
      map((isLogged:boolean) => !isLogged)
    );
  }
  
}

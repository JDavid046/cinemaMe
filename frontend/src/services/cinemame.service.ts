import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CinemaService {

    constructor(private http: HttpClient,){}    

    login(data){
        const result = this.http.post<any>(`${environment.API_1}/auth/login`, data).toPromise();                
        return result;
    }
}
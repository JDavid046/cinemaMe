import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogged = false;

  constructor(
    private cinemaSvc: CinemaService,
    private route: Router
    ) { }

  ngOnInit() {
    const session = this.cinemaSvc.isLogged.subscribe((res) => this.isLogged = res);
    if(this.isLogged) this.route.navigate(['index']);
  }

  async login(data){
    
    try {
      this.cinemaSvc.login({
        "email": data.username,
        "password": data.password
      }).subscribe(res => {
        if(res) this.route.navigate(['index']);
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Email or Password Incorrect',
        icon: 'error',
        confirmButtonText: 'Cool'
      })       
    }  
  }

}

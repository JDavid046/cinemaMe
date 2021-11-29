import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/services/cinemame.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private cinemaSvc: CinemaService,
    private route: Router
    ) { }

  ngOnInit() {    
  }

  async login(data){
    
    try {
      const result = await this.cinemaSvc.login({
        "email": data.username,
        "password": data.password
      });

      this.route.navigateByUrl('home');

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

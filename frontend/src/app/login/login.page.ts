import { Component, OnDestroy, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  private isValidEmail = /\S+@\S+\.\S+/;
  private subscriptions: Subscription[] = [];
  isLogged = false;

  constructor(
    private cinemaSvc: CinemaService,
    private route: Router
    ) { }


  ngOnInit() {
    this.subscriptions.push(
      this.cinemaSvc.isLogged.subscribe((res) => this.isLogged = res)
    );
    if(this.isLogged) this.route.navigate(['index']);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  

  async login(data){  
    
    const regExp = new RegExp(this.isValidEmail);
    if(!regExp.test(data.email)){
      Swal.fire({
        title: 'Enter a valid email',        
        icon: 'info',
        confirmButtonText: 'Ok'
      })

      return;
    }

    try {
      const action = await this.cinemaSvc.login({
        "email": data.email,
        "password": data.password
      }).subscribe(res => {
        if (res) this.route.navigate(['/index']);        
      });
  
      this.subscriptions.push(action);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }    
  }
}

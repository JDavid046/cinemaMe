import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaService } from '../../services/cinemame.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private cinemaSvc: CinemaService,
    private route: Router) { }

  ngOnInit() {}

  onLogout(){
    this.cinemaSvc.logout();
    this.route.navigate(['login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinemame.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private cinemaSvc: CinemaService) { }

  ngOnInit() {}

  onLogout(){
    this.cinemaSvc.logout();    
  }

}

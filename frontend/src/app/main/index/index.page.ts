import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/shared/services/cinemame.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(public cinemaSvc: CinemaService) { }

  ngOnInit() {
  }

}

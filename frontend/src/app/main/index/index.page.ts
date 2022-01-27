import { Component, OnInit, ViewChild } from '@angular/core';
import { CinemaService } from 'src/app/shared/services/cinemame.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage {

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  constructor(public cinemaSvc: CinemaService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'Hello World',
          data: [150, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]          
        }]
      }
  });
  }
}

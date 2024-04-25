import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  public chart: any;

  @Input() show!: boolean

  @Input() currentWeather!: string;

  public chatId = 'WisyLineChart';


  constructor() { }

  ngOnInit(): void { }


  public plotLineChart(labelHeading: string, labels: string[], temperatures: string[]): void {
    this.chart = new Chart(this.chatId, {
      type: 'line',
      data: {
        labels: labels, 
	      datasets: [
          {
            label: labelHeading,
            data: temperatures,
            fill: false,
            borderColor: '#20232a',
            backgroundColor: '#28727d',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `${this.currentWeather} Line Chart`
          },
        },
        aspectRatio: 2.5,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Period'              
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Temperature in Farenheit'
            }
          }
        }
      }
      
    });
  }

}

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/model/campaign';
import * as Highcharts from 'highcharts';
import { CampaignService } from 'src/app/services/campaign.service';
import { Details } from 'src/app/model/details';
import { Phone } from 'src/app/model/phone';


@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: false }) public chartEl: ElementRef;
  @ViewChild('chart2', { static: false }) public chartEl2: ElementRef;

  public campaignDetails = new Details();
  public phones: Phone[] = [];
  public isStatus = true;
  public createdDate;
  public startDate;
  public endDate;
  public load = false;

  private _chart: any;
  private _chart2: any;

  constructor(private campaignService: CampaignService, activateRoute: ActivatedRoute) {
    let id = activateRoute.snapshot.params['id'];
    this.campaignService.get(id).subscribe((data => {
      this.campaignDetails = data;
      this.createdDate = new Date(this.campaignDetails.created);
      this.startDate = new Date(this.campaignDetails.start);
      this.endDate = new Date(this.campaignDetails.ended);
      this.phones = this.campaignDetails.phones;
      this.load = true;
    }))

  }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    let opts: any = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      tooltip: {
        pointFormat: '<b>{series.name}</b>: {point.y}'
      },
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}',
            style: {
              color: (Highcharts.Color && Highcharts.color.name) ||
                'black'
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Статус',
        data: [
          ['Ошибка в номере', 45.0],
          ['Не прошло модерацию', 26.8],
          ['Нет на связи', 12.8],
          ['Номер не обслуживается', 8.5],
          ['Доставлено', 6.2]
        ]
      }]
    };
    let opts2: any = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      tooltip: {
        pointFormat: '<b>{series.name}</b>: {point.y}'
      },
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}',
            style: {
              color: (Highcharts.Color && Highcharts.color.name) ||
                'black'
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Оператор',
        data: [
          ['Ukraine - Utel', 45.0],
          ['Ukraine - Beeline', 26.8],
          ['Ukraine - Life', 12.8],
          ['Ukraine - MTS', 8.5],
          ['Ukraine - Kyivstar', 6.2]
        ]
      }]
    };
    if (this.chartEl && this.chartEl.nativeElement) {
      opts.chart = {
        type: 'spline',
        renderTo: this.chartEl.nativeElement
      };
      this._chart = new Highcharts.Chart(opts);
    }
    if (this.chartEl2 && this.chartEl2.nativeElement) {
      opts2.chart = {
        type: 'spline',
        renderTo: this.chartEl2.nativeElement
      };
      this._chart2 = new Highcharts.Chart(opts2);
    }
  }

  public onActive() {
    if (this.isStatus == true) {
      this.isStatus = false;
      return
    }
    this.isStatus = true;
  }
}

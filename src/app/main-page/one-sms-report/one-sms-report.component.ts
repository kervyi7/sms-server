import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { HttpClient } from '@angular/common/http';
import { ManualStatisticViewModel } from 'src/app/model/manual-statistic-view-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-one-sms-report',
  templateUrl: './one-sms-report.component.html',
  styleUrls: ['./one-sms-report.component.css']
})
export class OneSmsReportComponent implements OnInit {

  constructor(private http: HttpClient, private appConfigService: AppConfigService, private dataService: DataService) { }
  private path = '/api/Service/GetMunualStatus';
  public statistics: ManualStatisticViewModel[];
  public load: boolean;

  ngOnInit() {
    this.GetStatus();
  }

  public GetStatus() {
    this.http.get<ManualStatisticViewModel[]>(this.appConfigService.getUrl() + this.path,  this.dataService.options).subscribe(
      data => {
        this.load = true;
        this.statistics = data;
      },
      error => {
        this.dataService.handleError(error);
      }
    );
  }
}

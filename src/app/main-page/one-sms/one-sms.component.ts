import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-one-sms',
  templateUrl: './one-sms.component.html',
  styleUrls: ['./one-sms.component.css']
})
export class OneSmsComponent implements OnInit {
  private path = '/api/Service/SendSMS';
  public phoneNumber: string;
  public text: string;
  public isOk: boolean;
  public isError: boolean;

  constructor(private http: HttpClient, private appConfigService: AppConfigService, private dataService: DataService) { }

  ngOnInit() {
  }

  public isDisable(): boolean {
    return this.phoneNumber == undefined || this.phoneNumber == '' || this.text == undefined || this.text == '';
  }

  public sendSMS() {
    this.isOk = false;
    this.isError = false;
    this.http.post(this.appConfigService.getUrl() + this.path, { phoneNumber: this.phoneNumber, text: this.text }, this.dataService.options).subscribe(
      () => {
        this.finished();
        this.isOk = true;
      },
      error => {
        this.finished();
        this.isError = true;
        this.dataService.handleError(error);
      }
    );
  }

  private finished() {
    this.phoneNumber = '';
    this.text == '';
  }

}

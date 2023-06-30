import { Component, OnInit, Input, ɵɵtextInterpolateV } from '@angular/core';
import { Campaign } from '../../model/campaign'
import { Phone } from '../../model/phone'
import { CampaignService } from 'src/app/services/campaign.service';
import * as XLSX from 'ts-xlsx';
import { ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  @ViewChild('someVar', { static: false }) input: ElementRef;
  public campaign = new Campaign();

  public dateNow = { year: new Date().getFullYear(), month: (new Date().getMonth() + 1), day: new Date().getDate() };
  public time
  public minDate = new Date();
  private arrayBuffer: any;
  private file: File;
  private phoneNumbers: string[] = [];
  public numbers: string[] = [];
  public wrongFormat = 0;
  private patternForNumbers = new RegExp(/([(]0(\d{2})[)](\s*|-*)(\d{2})(\s*|-*)(\d{2})(\s*|-*)(\d{3}))|((\s*|-*|[(]*)0(\d{2})(\s*|-*|[)]*)(\d{2})(\s*|-*)(\d{2})(\s*|-*)(\d{3}))|(0(\d{2})((\s*|-*)(\d{2})){3})|(0(\d{9}))|(0(\s*|-*)([(]*)(\d{2})([)]*)(\s*|-*)(\d{3})(\s*|-*)(\d{2})(\s*|-*)(\d{2})|(0(\s*|-*)([(]*)(\d{2})([)]*)(\s*|-*)(\d{7}))|(([(]*)0(\d{2})([)]*)(\s*|-*)(\d{3})(\s*|-*)(\d{2})(\s*|-*)(\d{2}))|(([(]*)0(\d{2})([)]*)(\s*|-*)(\d{3})(\s*|-*)(\d{1})(\s*|-*)(\d{3}))|(([(]*)0(\d{2})([)]*)(\s*|-*)(\d{2})(\s*|-*)(\d{2})(\s*|-*)(\d{3}))|(([(]*)0(\d{2})([)]*)(\s*|-*)(\d{3})(\s*|-*)(\d{2})(\s*|-*)(\d{2})))/g);
  public inputOfNumbers: string;
  public smsLength = 161;
  public coding = 'Латиница';

  constructor(private campaignService: CampaignService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public incomingfile(event) {
    this.file = event.target.files[0];
    this.upload()
  }

  private toTimestamp(): number {
    let date = new Date(this.dateNow.month + " " + this.dateNow.day + " " + this.dateNow.year).toISOString();
    let parsedDate = Date.parse(date);
    const hourTimestamp = this.time.hour * 60 * 60 * 1000;
    const minuteTimestamp = this.time.minute * 60 * 1000;
    return this.campaign.start = parsedDate + hourTimestamp + minuteTimestamp;
  }

  public onCreate() {
    if (this.campaign.smsText == undefined || this.campaign.smsText.trim() == '') {
      const message = 'Введите текст сообщения';
      this.openSnackBar(message);
      return;
    }
    if (this.numbers.length == 0) {
      const message = 'Введите номера телефонов';
      this.openSnackBar(message);
      return;
    }
    if (this.campaign.name == undefined || this.campaign.name == '') {
      this.campaign.name = "Название"
    }
    this.campaign.phones = this.convertToPhonesByNumbers(this.phoneNumbers)
    this.toTimestamp()
    this.campaignService.create(this.campaign).subscribe(data => (
      this.router.navigate(["/main/reports"])
    ));
  }

  private openSnackBar(message: string) {
    let action = '✕';
    this._snackBar.open(message, action);
  }

  private upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      let data = new Uint8Array(this.arrayBuffer);
      let arr = new Array();
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      let workbook = XLSX.read(arr.join(""), { type: "binary" });
      if (workbook.SheetNames.length == 0) {
        return
      }
      let first_sheet_name = workbook.SheetNames[0];
      let worksheetJson = XLSX.utils.sheet_to_csv(workbook.Sheets[first_sheet_name]);
      this.validationNumbers(worksheetJson);
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  private validationNumbers(stringOfNumbers: string) {
    let allNumbers = stringOfNumbers.split('\n').length;
    let validNumbers = stringOfNumbers.match(this.patternForNumbers);
    let correctNumbers = [];
    validNumbers.forEach(function (item) {
      let result = item.replace(/\D/g, "");
      correctNumbers.push(38 + result);
    });
    this.inputOfNumbers = correctNumbers.join('\r\n');
    this.phoneNumbers = correctNumbers;
    this.wrongFormat = allNumbers - correctNumbers.length;
    this.numbers = correctNumbers;
  }

  public confirm() {
    this.validationNumbers(this.inputOfNumbers)
  }

  private convertToPhonesByNumbers(numbers: string[]): Phone[] {
    let phones: Phone[] = [];
    numbers.forEach((item) => {
      let phone = new Phone();
      phone.number = item;
      phones.push(phone);
    })
    return phones;
  }

  private getIsContainsRushianChars(): boolean {
    let ruChars = new RegExp(/([а-я]|[А-Я]|ё|Ё)/g);
    return ruChars.test(this.campaign.smsText)
  }

  public onInputChange(): number {
    if (this.getIsContainsRushianChars()) {
      this.coding = 'Кириллица';
      return this.smsLength = 71;
    } else {
      this.coding = 'Латиница';
      return this.smsLength = 161
    }
  }

  public getSmsCount(value: string): number {
    return value.length == 0 ? 0 : Math.trunc(value.length / this.smsLength) + 1;
  }
}

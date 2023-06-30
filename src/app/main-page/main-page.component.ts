import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isCollapsed = true;
  navbarOpen = false;

  constructor(private router: Router, private dataService: DataService, private translate: TranslateService) {
  }

  ngOnInit() {
  }

  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public changeTranslate(lang: string) {
    this.translate.use(lang);
  }

  public exit() {
    this.dataService.changeAuthTokenAndRequestHeader()
    this.router.navigate(['/login'])
  }
}

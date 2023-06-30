import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { AppConfigService } from './app-config.service';

@Injectable()
export class AuthDataService {
  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private config: AppConfigService
  ) {}

  public logIn(login: string, password: string): Observable<any> {
    const url = this.config.getUrl() + '/token';
    const body = 'username=' +
      encodeURIComponent(login) +
      '&password=' +
      encodeURIComponent(password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http
      .post(url, body, { headers })
      .pipe(catchError(err => this.dataService.handleError(err)));
  }
}

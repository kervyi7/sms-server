import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';

import {
  AUTHORIZATION_LABEL,
  BEARER_LABLE,
  X_AUTH_TOKEN_LABLE
} from '../core/constants/common';
import { AppConfigService } from './app-config.service';
import { Router } from '@angular/router';

@Injectable()
export class DataService {
  private _apiUrl: string;
  private _options: { headers: HttpHeaders };

  get options(): { headers: HttpHeaders } {
    if (!this._options) {
      this._options = {
        headers: this.getHttpHeaders(
          JSON.parse(localStorage.getItem(X_AUTH_TOKEN_LABLE))
        )
      };
    }
    return this._options;
  }

  constructor(private http: HttpClient, private config: AppConfigService, private router: Router) {
    //this._apiUrl ="http://127.0.0.1:50181/api"
    this._apiUrl = config.getUrl() + "/api";
  }

  private getJSON(): Observable<any> {
    return this.http.get("./assets/i18n/settings.json");
  }

  private getHttpHeaders(token) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      [AUTHORIZATION_LABEL]: BEARER_LABLE + token
    });
  }

  private setAuthToken(token) {
    localStorage.setItem(X_AUTH_TOKEN_LABLE, token);
    this.options.headers = this.getHttpHeaders(JSON.parse(token));
  }

  private clearAuthToken() {
    localStorage.removeItem(X_AUTH_TOKEN_LABLE);
    this.options.headers = this.getHttpHeaders('');
  }

  public changeAuthTokenAndRequestHeader(token?: string) {
    if (token) {
      this.setAuthToken(token);
    } else {
      this.clearAuthToken();
    }
  }

  public get(url: string, id?: number | string): Observable<any> {
    return this.http
      .get(this.getUrl(url, id), this.options)
      .pipe(catchError(err => this.handleError(err)));
  }

  public post(url: string, body, message?: string): Observable<any> {
    return this.http.post(this.getUrl(url), body, this.options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  public put(
    url: string,
    id: number | string,
    body: any,
    message?: string
  ): Observable<any> {
    return this.http.put(this.getUrl(url, id), body, this.options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  public delete(
    url: string,
    id: number | string,
    message?: string
  ): Observable<any> {
    return this.http.delete(this.getUrl(url, id), this.options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  public handleError(error: any) {
    const errorMessage =
      (error && error.error_description) || 'STRINGS.SERVER_ERROR';
      if (error.status === 401) {
        this.changeAuthTokenAndRequestHeader();
        this.router.navigate(["/login"]);
        return;
      }
    console.log(errorMessage);
    return throwError(error);
  }

  public getUrl(url: string, id?: number | string): string {
    let result = this._apiUrl + url;
    if (id) {
      result = result + '/' + id;
    }
    return result;
  }
}
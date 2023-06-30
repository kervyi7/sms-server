import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private config: any = null;

    constructor(private http: HttpClient) { }

    public getUrl() {
        return this.config.SETTING.BACK_URL;
    }

    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('app/settings.json').subscribe(
                data => {
                    this.config = data;
                    resolve(true);
                },
                error => {
                    resolve(true);
                    return Observable.throw(error);
                }
            );
        });
    }
}
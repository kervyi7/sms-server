import { CanActivate, Router } from '@angular/router';
import { Observable, } from 'rxjs';
import { X_AUTH_TOKEN_LABLE } from '../core/constants/common';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) { }

    public canActivate(): Observable<boolean> | boolean {
        return Observable.create(observer => {
            if (localStorage.getItem(X_AUTH_TOKEN_LABLE) == null) {
                observer.next(false);
                observer.complete();
                this.router.navigate(['/login']);
                return;
            }
            observer.next(true);
            observer.complete();
        });
    }
}

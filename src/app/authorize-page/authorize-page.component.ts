import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthDataService } from '../services/auth-data.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-authorize-page',
  templateUrl: './authorize-page.component.html',
  styleUrls: ['./authorize-page.component.css']
})
export class AuthorizePageComponent implements OnInit {

  public username: string;
  public password: string;
  public showSpinner: boolean;
  public errorMessage = null;
  public authorazed: boolean;
  route: ActivatedRouteSnapshot;
  state: RouterStateSnapshot;
  constructor(
    private authService: AuthDataService,
    private dataService: DataService,
    private router: Router
  ) {

  }

  // canActivate() {
  //   if (this.authForm.valid) {
  //     this.router.navigate(['/main']);
  //     return true;
  //   } else {
  //     this.router.navigate(['/login'], {
  //       queryParams: {
  //         return: this.state.url
  //       }
  //     });
  //     return false;
  //   }
  // }

  ngOnInit() {
    //this.initForm();
  }

  // private initForm() {
  //   this.authForm = new FormGroup({
  //     email: new FormControl(),
  //     password: new FormControl()
  //   })
  // }

  // onLogin() {
  //   this.canActivate();
  // }

  public onLogin(): void {
    this.errorMessage = null;
    this.showSpinner = true;
    const subscriber = this.authService
      .logIn(this.username, this.password)
      .subscribe(
        data => {
          this.dataService.changeAuthTokenAndRequestHeader(
            JSON.stringify(data.access_token)
          );
          this.router.navigate(['/main']);
          this.showSpinner = false;
        },
        err => {
          if (err.status === 400) {
            this.errorMessage = 'Некорректный логин или пароль';
          } else {
            this.errorMessage = 'Сервер не доступен';
          }
        }
      );
  }
}

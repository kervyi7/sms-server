import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainPageRoutingModule } from './main-page/main-page-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthDataService } from './services/auth-data.service';
import { DataService } from './services/data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthorizePageComponent } from './authorize-page/authorize-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageModule } from './main-page/main-page.module';
import { CustomMaterialModule } from './core/custom-material.module';
import { MatNativeDateModule } from '@angular/material';
import { CampaignService } from './services/campaign.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthorizePageComponent,
    MainPageComponent
  ],
  imports: [
    CustomMaterialModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MainPageRoutingModule,
    MainPageModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [AuthGuardService, AuthDataService, DataService, CampaignService],
  bootstrap: [AppComponent]
})
export class AppModule { }

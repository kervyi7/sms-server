import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MainPageRoutingModule } from './main-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CampaignComponent } from './campaign/campaign.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { ReferenceComponent } from './reference/reference.component';
import { AuthDataService } from '../services/auth-data.service';
import { CustomMaterialModule } from '../core/custom-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppConfigService } from '../services/app-config.service';
import { TranslateModule } from '@ngx-translate/core';
import { IncomingMessagesComponent } from './incoming-messages/incoming-messages.component';
import { ReportDetailsComponent } from './reports/report-details/report-details.component';
import { OneSmsComponent } from './one-sms/one-sms.component';
import { OneSmsReportComponent } from './one-sms-report/one-sms-report.component';

export function initConfig(config: AppConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [
    CampaignComponent,
    ReportsComponent,
    SettingsComponent,
    ReferenceComponent,
    IncomingMessagesComponent,
    ReportDetailsComponent,
    OneSmsComponent,
    OneSmsReportComponent
  ],
  imports: [
    MainPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule,
    NgbModule,
    TranslateModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true
    },
    AuthDataService]
})
export class MainPageModule { }
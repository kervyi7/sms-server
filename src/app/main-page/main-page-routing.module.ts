import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthGuardService } from "../services/auth-guard.service";
import { MainPageComponent } from './main-page.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { ReferenceComponent } from './reference/reference.component';
import { IncomingMessagesComponent } from './incoming-messages/incoming-messages.component';
import { ReportDetailsComponent } from './reports/report-details/report-details.component';
import { OneSmsComponent } from './one-sms/one-sms.component';
import { OneSmsReportComponent } from './one-sms-report/one-sms-report.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "main",
                component: MainPageComponent,
                canActivate: [AuthGuardService], // если Guard вернет false маршрут не активируется.
                children: [
                    { path: "campaign", component: CampaignComponent },
                    {
                        path: "reports", children: [
                            { path: "", component: ReportsComponent },
                            { path: "details/:id", component: ReportDetailsComponent },
                        ]
                    },
                    { path: "incoming-messages", component: IncomingMessagesComponent },
                    { path: "settings", component: SettingsComponent },
                    { path: "one-sms", component: OneSmsComponent },
                    { path: "one-sms-report", component: OneSmsReportComponent },
                    { path: "reference", component: ReferenceComponent },
                    { path: "", redirectTo: "campaign", pathMatch: "full" }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class MainPageRoutingModule { }
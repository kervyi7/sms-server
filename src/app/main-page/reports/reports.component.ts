import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/model/report';
import { CampaignService } from 'src/app/services/campaign.service';
import { Campaign } from 'src/app/model/campaign';
import { CampaignVM } from 'src/app/model/campaing-view-model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  private fullCampaignVMs: CampaignVM[] = [];
  public campaignVMs: CampaignVM[] = [];
  public selectedId: number;
  public load = false;
  constructor(private campaignService: CampaignService) {

  }

  ngOnInit() {
    this.campaignService.get().subscribe(data => {
      this.initCampaignModel(data);
      this.campaignVMs = this.fullCampaignVMs;
      this.load = true;
    });
  }

  private initCampaignModel(campaigns: Campaign[]) {
    campaigns.forEach((c => {
      let campaignVM: CampaignVM = new CampaignVM();
      campaignVM.id = c.id;
      campaignVM.name = c.name;
      campaignVM.status = c.status;
      campaignVM.created = new Date(c.created);
      campaignVM.start = new Date(c.start);
      campaignVM.ended = new Date(c.ended);
      campaignVM.smsText = c.smsText;
      campaignVM.isEvenly = c.isEvenly;
      campaignVM.isRandom = c.isRandom;
      campaignVM.phones = c.phones;
      campaignVM.countPhone = c.countPhone;
      this.fullCampaignVMs.push(campaignVM);
    }));
  }

  public search(filter: string, from: string, to: string) {
    if (!filter && !from && !to) {
      this.campaignVMs = this.fullCampaignVMs;
      return;
    }
    let fromDate = new Date(from);
    let toDate = new Date(to);
    let fiterTrim = filter.trim().toLowerCase();
    let searchCampaign = this.fullCampaignVMs;
    if (filter) {
      searchCampaign = searchCampaign.filter(c => (c.name.toLowerCase().includes(fiterTrim)));
    }
    if (from) {
      searchCampaign = searchCampaign.filter(c => (c.start >= fromDate));
    }
    if (to) {
      searchCampaign = searchCampaign.filter(c => (c.start <= toDate));
    }
    this.campaignVMs = searchCampaign;
  }

  public onActive(item: CampaignVM) {
    if (this.selectedId == item.id) {
      this.selectedId = null;
      return;
    }
    this.selectedId = item.id;
  }
}

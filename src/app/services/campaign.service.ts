import { Injectable } from "@angular/core";
import { BaseDataService } from './Base-data.service';
import { DataService } from './data.service';
import { Campaign } from '../model/campaign';

@Injectable()
export class CampaignService extends BaseDataService<Campaign> {
    constructor(dataService: DataService) {
        super(dataService);
        this.baseUri = '/campaign'
    }
}
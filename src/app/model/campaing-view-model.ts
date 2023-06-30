import { Phone } from './phone';

export class CampaignVM {
    public id: number;
    public name: string;
    public status: string;
    public created: Date;
    public start: Date;
    public started: Date;
    public ended: Date;
    public smsText: string;
    public countPhone: number | null;
    public isRandom: boolean | null;
    public isEvenly: boolean | null;
    public phones: Phone[];
}
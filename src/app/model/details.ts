import { Phone } from './phone';

export class Details {
    public campaignId: number;
    public name: string;
    public created: number;
    public start: number;
    public ended: number;
    public started: number;
    public sentTo: number;
    public delivered: number;
    public smsText: string;
    public countPhone: number;
    public phones: Phone[];
}
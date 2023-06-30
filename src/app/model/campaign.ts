import { Phone } from './phone'

export class Campaign {
    public id: number;
    public name: string;
    public status: string;
    public created: number;
    public start: number;
    public ended: number;
    public started: number;
    public smsText: string;
    public countPhone: number | null;
    public isRandom: boolean | null;
    public isEvenly: boolean | null;
    public phones: Phone[];
    //public isActive: boolean;
}
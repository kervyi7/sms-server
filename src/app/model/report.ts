import { Details } from './details';

export class Report {
    public id: number;
    public name: string;
    public status: string;
    public start: number;
    public end: number;
    public count: number;
    public price: number;
    public smsText: string;
    public details: Details[];
    public isActive: boolean;
}
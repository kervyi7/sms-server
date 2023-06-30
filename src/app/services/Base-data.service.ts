import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable()
export abstract class BaseDataService<T> {
  protected baseUri: string;

  constructor(protected dataService: DataService) {}

  public get(id?: number | string): Observable<T[] | T | any> {
    return this.dataService.get(this.baseUri, id);
  }

  public create(item: T, message?: string): Observable<any> {
    return this.dataService.post(this.baseUri, item, message);
  }

  public update(
    id: number | string,
    item: T,
    message?: string
  ): Observable<any> {
    return this.dataService.put(this.baseUri, id, item, message);
  }

  public delete(id: number | string, message?: string): Observable<any> {
    return this.dataService.delete(this.baseUri, id, message);
  }

  protected createServiceUri(uri: string): string {
    return `${this.baseUri}/${uri}`;
  }
}

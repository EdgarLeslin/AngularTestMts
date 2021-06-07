import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ErrorService } from '@views/service/error.service';
import { ICurrentData } from '@views/interface/channelData.interface'

@Injectable()
export class SERVER_DATA {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  private url: string = 'channelDetails';
  /** это костыль только в текущем случае, т.к. json-server  не работает при total != object | array*/
  private total: string = 'total';
  public subscriptions$: Subscription = new Subscription();

  /**  Храним данные с сервера */
  public channelData: any;
  public channelTotal: any;

  public _get<T = unknown>(
    url: string,
    apiFragment: string = '',
    params?: HttpParams
  ): Observable<T> {
    return this.http
      .get<T>(`/${url}${apiFragment}`, { params })
      .pipe(catchError(this.errorService.handleError));
  }

  private readData<T = unknown>(url: string, fragment: string): Observable<T> {
    return this._get(url, fragment);
  }

  /**  Получаем данные с сервера */
  public fetchData(apiFragment: string): Subscription {
      return  this.readData(this.url, apiFragment)
      .pipe()
      .subscribe((response) => (this.channelData = response));
    }

      /**  Получаем данные с сервера */
  public fetchTotal(): Subscription {
    return  this.readData(this.total, '')
    .pipe()
    .subscribe((response) => (this.channelTotal = response));
  }

}

import { Injectable } from '@angular/core';
import { pipe, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, filter, map, reduce } from 'rxjs/operators';
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


  /** Сортировка и отображение */
  public endPage: number = 24;
  public apiFragment:string = '?_start=0&_end='
  public apiSort: string = ""
  public apiVar: string = ""
  public apiFilter:string = ""
  public sortFlag: boolean = false;

  public getApiSort():string {
  const apiSortConst = '&_sort=name'
   let apiSortOrder: string = ''
    if(this.apiSort.indexOf("asc") != -1) {
      apiSortOrder = "&_order=desc"
      this.sortFlag = false;
      return apiSortConst + apiSortOrder
    } else {
      apiSortOrder = "&_order=asc"
      this.sortFlag = true;
      return apiSortConst + apiSortOrder
    }

  }



  /** Костыль, нужно один раз загрузить все данные с бэка, чтобы посчитать, сколько возможна длина массива жанра,
   *  и далее уже отправлять множество запросов.... ужастно, но так можно получить хотябы отчасти фильтрацию
   * на стороне бэка, ведь в массие жанры может быть несколько жанров у одного канала, текущая апи отфильтрова
   * сразу не позволяет, а осуществлять это на фронте - еще хуже.
   */
  // public allDataForGenres: number = 0;
  // public channelDataFilter: any = []





  // /**  Получаем данные с сервера */
  // public fetchAllGenres(genreID: string): Subscription {


  //   return this.channelData.
  //     filter(
  //       (res: any) => (res.name == "Первый канал", console.log(res))
  //     )



  //   return  this.readData(this.url, '')
  //   .pipe(

  //   )
  //   .subscribe(
  //     (res: any) => {
  //       console.log(res)
  //         for(let elem in res) {
  //           res[elem].genres.forEach((element: any) => {
  //             if(element.genreID == genreID){
  //               return this.channelData.push(res[elem])
  //             }
  //           });
  //         }
  //       // this.allDataForGenres = max;
  //       // this.channelData = res
  //     }
  //   )

  //   ;
  // }




  // public fetchAllGenre(genreID: string){
  //   this.channelData = []
  //   let i: number = 0;

  //   while(i < this.allDataForGenres) {
  //     const apiGenreID: string = `&genres.${i}.genreID=${genreID}`

  //     this.fetchGenre(apiGenreID)

  //     i++

  //     console.log(this.channelData)
  //   }

  // }


  // public fetchGenre(apiFragment: string): Subscription {
  //   this.summApi()
  //     let api = this.apiVar + apiFragment;
  //     return  this.readData(this.url, api)
  //     .pipe()
  //     .subscribe((response: any) => (this.channelData.push(...response)));
  //   }


  /** собираем все фрагменты АПИ */
  public summApi(): void {
    this.apiVar = this.apiFragment + this.endPage + this.apiSort
  }

  public _get<T = unknown>(
    url: string,
    apiFragment: string = ''
  ): Observable<T> {
    console.log(`/${url}${apiFragment}`)
    return this.http
      .get<T>(`/${url}${apiFragment}`)
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

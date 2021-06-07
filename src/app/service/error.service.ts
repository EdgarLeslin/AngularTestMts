import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
// import { custom } from "devextreme/ui/dialog";

@Injectable()
/**
 * Класс предоставляет методы обработки и отображения ошибок
 */
export class ErrorService {
  /**
   * Обработчик ошибок
   * @param error ошибка
   */
  public handleError(response: any): Observable<never> {
    let message: string = '';
    if (response.status == 0) {
      message = 'Запрос не выполнен, попробуйте позже';
    } else {
      message = response.error.detail
        ? response.error.detail
        : response.status + ' ' + response.statusText;
    }
    console.log(`Ошибка ${response.status}. ${message}`);
    return throwError(response);
  }

  constructor() {}
}

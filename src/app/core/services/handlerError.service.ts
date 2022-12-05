import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client';
import { backendErrorMsg } from 'Core/helpers';
import { Subject, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HandlerErrorService {
  $error = new Subject<string>();
  handleError = ({ networkError, graphQLErrors, message }: ApolloError) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(e => {
        console.log('Apollo GraphQL Error', e);
        this.notificationService.error(
          'Apollo GraphQL Error',
          backendErrorMsg(e)
        );
        this.$error.next('Ошибка загрузки данных');
      });
    }
    if (networkError) {
      const { error: serverErrors, ...apolloNetworkError } =
        networkError as any;
      console.log('Apollo Network Error', apolloNetworkError);
      this.notificationService.error(
        'Apollo Network Error',
        backendErrorMsg(apolloNetworkError)
      );
      this.$error.next('Ошибка загрузки данных');

      serverErrors.error?.errors.forEach((e: any) => {
        console.log('Apollo Network Error', e);
        this.notificationService.error(
          'Apollo Network Error',
          backendErrorMsg(e)
        );
        this.$error.next('Ошибка загрузки данных');
      });
    }
    return throwError(() => new Error(message));
  };

  constructor(private notificationService: NotificationService) {}
}

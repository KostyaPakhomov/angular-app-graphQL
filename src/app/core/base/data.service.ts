import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  loadCharacters,
  loadCharactersByIds,
  loadOneCharacter,
} from 'Core/constants/items';
import { HandlerErrorService } from 'Core/services/handlerError.service';
import { catchError, map } from 'rxjs/operators';
import { CharactersPagination, Pagination } from '../models/pagination';
import { FilterValues } from './page-index.component';

@Injectable()
export abstract class DataService<T, K> {
  protected abstract ctor: Type<K>;
  isRestore = false;

  constructor(
    protected http: HttpClient,
    private apollo: Apollo,
    private errorService: HandlerErrorService
  ) {}

  index(params?: Record<string, any>) {
    let { character }: FilterValues = params!;

    return this.apollo
      .query<Pagination<T, K>>({
        query: loadCharactersByIds,
        variables: { ids: character },
      })
      .pipe(
        map(response =>
          response?.data.charactersByIds.map(item => new this.ctor(item))
        ),
        catchError(this.errorService.handleError)
      );
  }

  indexPaginated(params?: Record<string, any>) {
    let { page, gender, search }: FilterValues = params!;
    return this.apollo
      .query<Pagination<T, K>>({
        query: loadCharacters,
        variables: {
          page,
          name: search,
          gender,
        },
      })
      .pipe(
        map(
          response =>
            new CharactersPagination(response?.data!.characters, this.ctor)
        ),
        catchError(this.errorService.handleError)
      );
  }

  show(id: number) {
    return this.apollo
      .query<Pagination<T, K>>({
        query: loadOneCharacter,
        variables: { id },
      })
      .pipe(
        map(response => new this.ctor(response.data.character)),
        catchError(this.errorService.handleError)
      );
  }
}

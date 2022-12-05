import { Type } from '@angular/core';

export interface Info {
  count: number | null;
  pages: number | null;
  next: number | null;
  prev: number | null;
}
export interface Pagination<T, K> {
  characters: CharactersPagination<T, K>;
  character: K;
  charactersByIds: K[];
}

export class CharactersPagination<T, K> {
  results!: K[];
  info!: Info;

  get nextPage(): number | null {
    return this.info?.next!;
  }
  get previousPage(): number | null {
    return this.info?.prev!;
  }

  constructor(data: CharactersPagination<T, K>, ctor: Type<K>) {
    Object.assign(this, data);
    this.results = data.results.map(item => new ctor(item));
  }
}

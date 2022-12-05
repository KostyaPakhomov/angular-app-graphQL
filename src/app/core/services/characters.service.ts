import { Injectable } from '@angular/core';
import { DataService } from 'Core/base/data.service';
import { Character, CharactersResponse } from 'Core/models';

@Injectable()
export class CharactersService extends DataService<
  CharactersResponse,
  Character
> {
  ctor = Character;
}

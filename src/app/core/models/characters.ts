import { Item } from 'Core/base';

export interface CharactersResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Origin {
  name: string;
  url: string;
}

export class Character extends Item implements CharactersResponse {
  id!: number;
  name!: string;
  status!: string;
  species!: string;
  type!: string;
  gender!: string;
  origin!: Origin;
  location!: Origin;
  image!: string;
  episode!: string[];
  url!: string;
  created!: string;
  constructor(data: CharactersResponse) {
    super(data);
  }
}

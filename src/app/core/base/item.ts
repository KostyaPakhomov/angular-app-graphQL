export abstract class Item {
  isLoading!: boolean;
  abstract id: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

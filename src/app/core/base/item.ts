export abstract class Item {
  isLoading!: boolean;
  abstract productID: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

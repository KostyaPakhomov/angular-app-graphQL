import { Item } from 'Core/base/item';

export interface ProductsResponse {
  name: string;
  unitPrice: number;
  quantityPerUnit: string;
  productID: number;
  supplier: Suplier;
  category: Category;
}

interface Suplier {
  companyName: string;
  supplierID: number;
  address: Adress;
}
interface Adress {
  country: string;
  city: string;
  region: string;
  street: string;
  postalCode: string;
  phone: string;
}

interface Category {
  name: string;
  categoryID: number;
  description: string;
}

export class Product extends Item implements ProductsResponse {
  name!: string;
  unitPrice!: number;
  quantityPerUnit!: string;
  productID!: number;
  supplier!: Suplier;
  category!: Category;

  constructor(data: ProductsResponse) {
    super(data);
  }
}

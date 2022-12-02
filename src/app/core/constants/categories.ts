interface CategoriesTypes {
  id: number;
  display_name: string;
}

export const categoriesTypes: CategoriesTypes[] = [
  { id: 0, display_name: 'Reset' },
  { id: 1, display_name: 'Beverages' },
  { id: 2, display_name: 'Condiments' },
  { id: 3, display_name: 'Confections' },
  { id: 4, display_name: 'Dairy Products' },
  { id: 5, display_name: 'Grains/Cereals' },
  { id: 6, display_name: 'Meat/Poultry' },
  { id: 7, display_name: 'Produce' },
  { id: 8, display_name: 'Seafood' },
];

Object.freeze(categoriesTypes);

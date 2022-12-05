interface GenderTypes {
  name: string;
  display_name: string;
}

export const genderTypes: GenderTypes[] = [
  { name: '', display_name: 'Не выбрано' },
  { name: 'female', display_name: 'Женщина' },
  { name: 'male', display_name: 'Мужчина' },
  { name: 'genderless', display_name: 'Бесполый' },
  { name: 'unknown', display_name: 'Неизвестный' },
];

Object.freeze(genderTypes);

import { Nutritions } from './nutritions';
export interface Fruit {
  id: number;
  name: string;
  family: string;
  genus: string;
  order: string;
  nutritions: Nutritions;
}

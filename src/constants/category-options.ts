import { z } from 'astro/zod';

export const categoryOptions = [
  'Bakery',
  'Baking',
  'Beverages',
  'Cleaning Supplies',
  'Dairy and Eggs',
  'Frozen',
  'Meat and Seafood',
  'Other',
  'Pantry',
  'Personal Care',
  'Produce',
  'Snacks'
] as const;

export const CategoryEnum = z.enum(categoryOptions);
export type CategoryUnion = z.infer<typeof CategoryEnum>;
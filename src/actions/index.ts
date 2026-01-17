import { defineAction } from 'astro:actions';
import { db, eq, Todos } from 'astro:db';
import { z } from 'astro/zod';
import { categoryOptions } from '../constants/category-options'

const CategoryEnum = z.enum(categoryOptions);

export type CategoryUnion = z.infer<typeof CategoryEnum>;

export const server = {
  updateTodo: defineAction({
    input: z.object({
      id: z.number(),
      checked: z.boolean()
    }),
    handler: async ({ id, checked }: { id: number; checked: boolean }) => {
      await db.update(Todos).set({ checked }).where(eq(Todos.id, id));
      console.log(`Todo with ID ${id} changed to ${checked}`);
    }
  }),
  addTodo: defineAction({
    input: z.object({
      id: z.number(),
      name: z.string(),
      category: CategoryEnum
    }),
    handler: async ({ id, name, category }: { id: number; name: string; category: CategoryUnion }) => {
      await db.insert(Todos).values({ id, name, checked: false, category });
      console.log(`Todo with ID ${id}, name ${name}, and category ${category} was added`);
    }
  }), 
  deleteTodo: defineAction({
    input: z.object({
      id: z.number()
    }),
    handler: async ({ id }: { id: number }) => {
      await db.delete(Todos).where(eq(Todos.id, id));
      console.log(`Todo with ID ${id} was deleted`);
    }
  })
}
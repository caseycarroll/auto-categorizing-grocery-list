import { defineAction } from 'astro:actions';
import { db, eq, Todos } from 'astro:db';
import { z } from 'astro/zod';

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
      name: z.string()
    }),
    handler: async ({ id, name }: { id: number; name: string }) => {
      await db.insert(Todos).values({ id, name, checked: false });
      console.log(`Todo with ID ${id} and name ${name} was added`);
    }
  })
}
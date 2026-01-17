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
  })
}
import { defineAction } from 'astro:actions';
import { db, eq, Probabilities, Todos } from 'astro:db';
import { z } from 'astro/zod';
import { CategoryEnum, type CategoryUnion } from '../constants/category-options'
import { createGroceryClassifier, type ClassifierMemory } from '../libs';

export const server = {
  updateTodoChecked: defineAction({
    input: z.object({
      id: z.number(),
      checked: z.boolean(),
    }),
    handler: async ({ id, checked }: { id: number; checked: boolean }) => {
      await db.update(Todos).set({ checked }).where(eq(Todos.id, id));
      console.log(`Todo with ID ${id} changed to ${checked}`);
    }
  }),
  updateTodoCategory: defineAction({
    input: z.object({
      id: z.number(),
      category: CategoryEnum,
    }),
    handler: async ({ id, category }: { id: number; category: CategoryUnion }) => {
      await db.update(Todos).set({ category }).where(eq(Todos.id, id));
      console.log(`Todo with ID ${id} changed category to ${category}`);
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
  }),
  classifyItem: defineAction({
    input: z.object({
      name: z.string()
    }),
    handler: async ({ name }: { name: string }) => {
      const probabilities = await db.select().from(Probabilities).limit(1);
      const memory = probabilities[0];
      const groceryClassifier = createGroceryClassifier({
        ...memory,
        vocabulary: new Set(memory.vocabulary as unknown as string[])
      } as ClassifierMemory);
      console.log('Classifying item:', name);
      console.log('ailse', groceryClassifier.classify(name))
      return groceryClassifier.classify(name);
    }
  }),
  // this naively adds tokens to a classifier's memory without removing any existing tokens
  trainClassifier: defineAction({
    input: z.object({
      name: z.string(),
      category: CategoryEnum
    }),
    handler: async ({ name, category }: { name: string; category: CategoryUnion }) => {
      const probabilities = await db.select().from(Probabilities).limit(1);
      const memory = probabilities[0];
      const groceryClassifier = createGroceryClassifier({
        ...memory,
        vocabulary: new Set(memory.vocabulary as unknown as string[])
      } as ClassifierMemory);
      groceryClassifier.train(name, category);
      await db.update(Probabilities).set({
        wordCounts: groceryClassifier.wordCounts,
        categoryTotals: groceryClassifier.categoryTotals,
        vocabulary: Array.from(groceryClassifier.vocabulary),
        totalItemsTrained: groceryClassifier.totalItemsTrained
      }).where(eq(Probabilities.id, memory.id));
      console.log('Trained classifier with item:', name, 'Category:', category);
    }
  })
}
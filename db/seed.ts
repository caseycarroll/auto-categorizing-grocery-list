import { db, Probabilities, Todos, } from 'astro:db';
import { groceryMemory } from '../src/libs/memory';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Probabilities).values([
		{
			id: 1,
			...groceryMemory,
			vocabulary: Array.from(groceryMemory.vocabulary)
		}
	])
}
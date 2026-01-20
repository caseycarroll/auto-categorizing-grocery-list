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
	await db.insert(Todos).values([
		{ id: 1, name: 'milk', checked: false, category: 'Dairy and Eggs' },
		{ id: 2, name: 'crackers', checked: true, category: 'Snacks' },
		{ id: 3, name: 'bread', checked: false, category: 'Bakery' },
	]);
}
import { db, Probabilities, Todos } from 'astro:db';
import { groceryMemory } from '../src/libs/memory';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Todos).values([
		{
			checked: true,
			name: "Apples",
			id: 1,
			category: "Produce"
		},
		{
			checked: false,
			name: "Deoderant",
			id: 2,
			category: "Personal Care"
		}
	])
	await db.insert(Probabilities).values([
		{
			...groceryMemory,
			vocabulary: Array.from(groceryMemory.vocabulary)
		}
	])
}
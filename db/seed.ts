import { db, Todos } from 'astro:db';

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
}

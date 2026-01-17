import { db, Todos } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Todos).values([
		{
			checked: true,
			name: "Laundry",
			id: 1
		},
		{
			checked: false,
			name: "Groceries",
			id: 2
		}
	])
}

import { db, Todos } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Todos).values([
		{
			checked: true,
			name: "Laundry"
		},
		{
			checked: false,
			name: "Groceries"
		}
	])
}

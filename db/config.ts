import { column, defineDb, defineTable } from 'astro:db';
const Todos = defineTable({
  columns: {
    checked: column.boolean(),
    name: column.text(),
    id: column.number(),
    category: column.text({
      enum: [
        'Produce',
        'Dairy and Eggs',
        'Meat and Seafood',
        'Bakery',
        'Pantry',
        'Beverages',
        'Snacks',
        'Frozen',
        'Personal Care',
        'Cleaning Supplies',
        'Other'
      ]
    })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Todos
  }
});

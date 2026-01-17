import { column, defineDb, defineTable } from 'astro:db';
const Todos = defineTable({
  columns: {
    checked: column.boolean(),
    name: column.text(),
    id: column.number(),
    category: column.text({
      enum: [
        'Bakery',
        'Baking',
        'Beverages',
        'Cleaning Supplies',
        'Dairy and Eggs',
        'Frozen',
        'Meat and Seafood',
        'Other',
        'Pantry',
        'Personal Care',
        'Produce',
        'Snacks'
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

import { column, defineDb, defineTable } from 'astro:db';
import { categoryOptions } from '../src/constants/category-options';
const Todos = defineTable({
  columns: {
    checked: column.boolean(),
    name: column.text(),
    id: column.number({ primaryKey: true }),
    category: column.text({
      enum: categoryOptions as unknown as [string, ...string[]]
    })
  }
})

const Probabilities = defineTable({
  columns: {
    id: column.number(),
    wordCounts: column.json(),
    categoryTotals: column.json(),
    vocabulary: column.json(),
    totalItemsTrained: column.number()
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Todos,
    Probabilities,
  }
});

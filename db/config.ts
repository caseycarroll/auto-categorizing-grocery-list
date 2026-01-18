import { column, defineDb, defineTable } from 'astro:db';
import { categoryOptions } from '../src/constants/category-options';
const Todos = defineTable({
  columns: {
    checked: column.boolean(),
    name: column.text(),
    id: column.number(),
    category: column.text({
      enum: categoryOptions as unknown as [string, ...string[]]
    })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Todos
  }
});

import { column, defineDb, defineTable } from 'astro:db';

const Todos = defineTable({
  columns: {
    checked: column.boolean(),
    name: column.text()
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Todos
  }
});

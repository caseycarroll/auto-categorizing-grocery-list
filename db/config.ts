import { column, defineDb, defineTable } from 'astro:db';

const Todos = defineTable({
  columns: {
    checked: column.boolean(),
    name: column.text(),
    id: column.number()
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Todos
  }
});

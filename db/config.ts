import { column, defineDb, defineTable } from 'astro:db';
import { categoryOptions } from '../src/constants/category-options';
const Todos = defineTable({
  columns: {
    checked: column.boolean(),
    name: column.text(),
    id: column.number({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
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

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    emailVerified: column.boolean(),
    image: column.text({ optional: true }),
    createdAt: column.date(),
    updatedAt: column.date(),
  }
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    token: column.text({ unique: true }),
    createdAt: column.date(),
    updatedAt: column.date(),
    ipAddress: column.text({ optional: true }),
    userAgent: column.text({ optional: true }),
    userId: column.text({ references: () => User.columns.id }),
  }
});

const Account = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    accountId: column.text(),
    providerId: column.text(),
    userId: column.text({ references: () => User.columns.id }),
    accessToken: column.text({ optional: true }),
    refreshToken: column.text({ optional: true }),
    idToken: column.text({ optional: true }),
    accessTokenExpiresAt: column.date({ optional: true }),
    refreshTokenExpiresAt: column.date({ optional: true }),
    scope: column.text({ optional: true }),
    password: column.text({ optional: true }),
    createdAt: column.date(),
    updatedAt: column.date(),
  }
});

const Verification = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    identifier: column.text(),
    value: column.text(),
    expiresAt: column.date(),
    createdAt: column.date({ optional: true }),
    updatedAt: column.date({ optional: true }),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Todos,
    Probabilities,
    User,
    Session,
    Account,
    Verification
  }
});

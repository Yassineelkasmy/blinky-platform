import { timestamp, varchar } from 'drizzle-orm/pg-core';

export const auditableColumns = {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: varchar('created_by', { length: 255 }),
    updatedAt: timestamp('updated_at'),
    updatedBy: varchar('updated_by', { length: 255 }),
    deletedAt: timestamp('deleted_at'),
    deletedBy: varchar('deleted_by', { length: 255 }),
};
import { Category } from '@/domain/category/schema';
import { z } from 'zod';

/**
 * Schema for the Expense domain entity.
 */
export const Expense = z.object({
    id: z.number(),
    description: z.string().nullable(),
    amount: z.number(),
    category: z.object(Category.shape),
    date: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().nullable().
        optional()
});

/**
 * Schema for the Expense domain entity listing.
 */
export const Expenses = z.array(z.object(Expense.shape));

/**
 * Schema for the Expense domain entity summary.
 */
export const ExpenseSummary = z.object({
    spent: z.number(),
    total: z.number()
});

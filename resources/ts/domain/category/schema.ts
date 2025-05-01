import { z } from 'zod';

/**
 * Schema for the Category domain entity.
 */
export const Category = z.object({
    id: z.number(),
    name: z.string()
});

/**
 * Schema for the Category domain entity listing.
 */
export const Categories = z.array(z.object(Category.shape));

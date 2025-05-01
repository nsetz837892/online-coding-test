import { z } from 'zod';

/**
 * Schema for the Permission domain entity.
 */
export const Permission = z.object({
    id: z.number(),
    name: z.string()
});

/**
 * Schema for the domain Role entity.
 */
export const Role = z.object({
    id: z.number(),
    name: z.string(),
    permissions: z.array(z.string())
});

import { Role } from '@/domain/user/schema';
import { z } from 'zod';

/**
 * Schema for the Auth domain entity.
 */
export const AuthResource = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.object(Role.shape),
    token: z.string()
});

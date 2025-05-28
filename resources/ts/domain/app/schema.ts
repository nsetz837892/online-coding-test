import { z } from 'zod';

/**
 * Creates a paginated response schema using the provided data type schema.
 */
export function createPaginatedResponseSchema<DataType extends z.ZodTypeAny> (dataTypeSchema: DataType) {
    return z.object({
        message: z.string().optional(),
        success: z.boolean(),
        status: z.number().optional(),
        errors: z.array(z.object(ApiError.shape)).optional(),
        data: dataTypeSchema.nullable(),
        meta: z.object(Meta.shape),
        links: z.object(Link.shape)
    });
}

/**
 * Meta represents the schema link attributes returned by an API.
 */
export const Link = z.object({
    first: z.string().nullable(),
    last: z.string().nullable(),
    next: z.string().nullable(),
    prev: z.string().nullable()
});

/**
 * MetaLink represents the schema for a metadata link object returned by an API.
 */
export const MetaLink = z.object({
    url: z.string().nullable(),
    label: z.string(),
    active: z.boolean()
});

/**
 * Meta represents the schema for paginated data and navigation links returned by an API.
 */
export const Meta = z.object({
    currentPage: z.number().nullable(),
    from: z.number().nullable(),
    lastPage: z.number().nullable(),
    path: z.string().nullable(),
    perPage: z.number().nullable(),
    to: z.number().nullable(),
    total: z.number().nullable(),
    links: z.array(z.object(MetaLink.shape)).optional()
});

/**
 * ApiError represents the schema for an error response returned by an API.
 */
export const ApiError = z.object({
    message: z.string(),
    code: z.string().optional()
});

/**
 * searchSchema represents the schema for search params type returned by an API.
 */
export const searchSchema = z.object({
    paginate: z.number().default(1).
        optional(),
    page: z.number().default(1).
        optional(),
    perPage: z.number().optional(),
    categoryId: z.number().optional(),
    filter: z.string().default('').
        optional(),
    sortBy: z.enum(['id', 'category', 'date']).default('date').
        optional(),
    desc: z.number().default(0).
        optional()
});

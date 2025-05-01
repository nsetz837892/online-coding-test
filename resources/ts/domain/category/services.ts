import { DataError } from '@/constants/data';
import { Categories as CategoriesSchema } from '@/domain/category/schema';
import { CategoryService } from '@/domain/category/types';
import { serviceHelper } from '@/domain/service-helper';
import { parseApiError } from '@/support/errors';
import { Api, Category, DomainError, Resource, ZodSafeResults } from '@/types';
import axios, { AxiosResponse, GenericAbortSignal } from 'axios';
import { err, ok, Result, ResultAsync } from 'neverthrow';

export const categoryService: CategoryService = {
    findMany: async (resource: Resource, signal?: GenericAbortSignal): Promise<Result<Category[], DomainError>> => {
        const asyncRes: Result<Api<Category>, DomainError> = await ResultAsync.fromPromise(
            axios.
                get(
                    serviceHelper.getQueryPath(
                        'authenticated.category.many',
                        resource
                    ),
                    { signal }
                ).
                then((response: AxiosResponse<Api<Category>>): Api<Category> => response.data),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'CATEGORY_FAILED'
            });
        }

        if (!asyncRes.value.success) {
            return err({
                message: asyncRes.value.message,
                type: 'CATEGORY_UNSUCCESSFUL'
            });
        }

        const transformRes: Result<ZodSafeResults<Category[]>, DomainError> = await ResultAsync.fromPromise(
            CategoriesSchema.safeParseAsync(asyncRes.value.data),
            parseApiError
        ).andThen(result => result?.error
            ? err({
                message: `Data Error ${DataError.CATEGORY}`,
                type: 'CATEGORY_DATA_FAILED'
            })
            : ok(result));

        if (transformRes.isErr()) {
            return err(transformRes.error);
        }

        return ok(transformRes.value.data as Category[]);
    }
};

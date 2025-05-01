import { DataError } from '@/constants/data';
import { AuthResource as AuthResourceSchema } from '@/domain/auth/schema';
import { AuthService } from '@/domain/auth/types';
import { serviceHelper } from '@/domain/service-helper';
import { parseApiError } from '@/support/errors';
import { Api, AuthResource, Credentials, DomainError, ZodSafeResults } from '@/types';
import axios, { AxiosResponse, GenericAbortSignal } from 'axios';
import { err, ok, Result, ResultAsync } from 'neverthrow';

export const authService: AuthService = {
    csrfCookie: async (signal?: GenericAbortSignal): Promise<Result<null, DomainError>> => {
        const asyncRes: Result<null, DomainError> = await ResultAsync.fromPromise(
            axios.get(
                serviceHelper.getPath('auth.csrfCookie'),
                { signal }
            ),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'CSRF_FAILED'
            });
        }

        return ok(null);
    },
    login: async (credentials: Credentials, signal?: GenericAbortSignal): Promise<Result<AuthResource, DomainError>> => {
        const asyncRes: Result<Api<AuthResource>, DomainError> = await ResultAsync.fromPromise(
            axios.
                post(
                    serviceHelper.getPath('auth.login'),
                    credentials,
                    { signal }
                ).
                then((response: AxiosResponse<Api<AuthResource>>): Api<AuthResource> => response.data),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'AUTH_FAILED'
            });
        }

        if (!asyncRes.value.success) {
            return err({
                message: asyncRes.value.message,
                type: 'AUTH_UNSUCCESSFUL'
            });
        }

        const transformRes: Result<ZodSafeResults<AuthResource>, DomainError> = await ResultAsync.fromPromise(
            AuthResourceSchema.safeParseAsync(asyncRes.value.data),
            parseApiError
        ).andThen(result => result?.error
            ? err({
                message: `Data Error ${DataError.AUTH}`,
                type: 'AUTH_DATA_FAILED'
            })
            : ok(result));

        if (transformRes.isErr()) {
            return err(transformRes.error);
        }

        return ok(transformRes.value.data as AuthResource);
    },
    logout: async (signal?: GenericAbortSignal): Promise<Result<null, DomainError>> => {
        const asyncRes: Result<Api<null>, DomainError> = await ResultAsync.fromPromise(
            axios.get(
                serviceHelper.getPath('auth.logout'),
                { signal }
            ).then((response: AxiosResponse<Api<null>>): Api<null> => response.data),
            parseApiError
        );

        if (asyncRes.isErr()) {
            return err({
                ...asyncRes.error,
                type: 'LOGOUT_FAILED'
            });
        }

        if (!asyncRes.value.success) {
            return err({
                message: asyncRes.value.message,
                type: 'LOGOUT_UNSUCCESSFUL'
            });
        }

        return ok(null);
    }
};

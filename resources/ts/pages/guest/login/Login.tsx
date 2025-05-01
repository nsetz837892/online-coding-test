import { FieldInfo } from '@/components/system/field-info';
import { Button } from '@/components/ui/button';
import { HelperText } from '@/components/ui/helper-text';
import { Input } from '@/components/ui/input';
import { Toast } from '@/components/ui/toast';
import { paths } from '@/constants/paths';
import { authService } from '@/domain/auth';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { AuthContext as AuthContextType, AuthResource, Credentials, DomainError } from '@/types';
import { BsExclamationSquareFill } from '@react-icons/all-files/bs/BsExclamationSquareFill';
import { useForm } from '@tanstack/react-form';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { NavigateFn, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Alert } from 'flowbite-react';
import { Result } from 'neverthrow';
import React, { FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

/**
 * Login handles a request to authenticate with the API.
 *
 * Accepts user credentials through an HTML form.
 * Validate the credentials.
 * Request the API to authenticate the login attempt.
 * Redirect on the result.
 *
 * @constructor
 */
const Login = (): React.ReactNode => {
    const queryClient: QueryClient = useQueryClient();
    const navigate: NavigateFn = useNavigate({ from: paths.guest.login });

    const authQueryKey = getAuthQueryKey();

    const abortControllerRef: React.RefObject<AbortController | null> = React.useRef(null);

    const [error, setError] = React.useState<string | null>(null);
    const [isPending, setIsPending] = React.useState<boolean>(false);

    /*
     * Validation schema for the login form.
     */
    const credentialSchema = z.object({
        username: z.
            string().
            min(
                1,
                'Username is required'
            ).
            regex(
                /^(?=.*[a-zA-Z])[-a-zA-Z\d@.]{4,}$/,
                'Username is not a valid'
            ),
        password: z.
            string().
            min(
                1,
                'Password is required'
            ).
            regex(
                /^.{6,}$/,
                'Password is not valid'
            )
    });

    /*
     * Login form.
     */
    const CredentialForm = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        onSubmit: async ({ value }: { value: Credentials }) => {
            setError(null);
            setIsPending(true);

            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();

            const csrfResult: Result<null, DomainError> = await authService.csrfCookie(abortControllerRef.current.signal);

            if (csrfResult.isErr()) {
                setIsPending(false);

                toast.error('Something went wrong!');

                return;
            }

            const authResult: Result<AuthResource, DomainError> = await authService.login(
                value,
                abortControllerRef.current.signal
            );

            setIsPending(false);

            if (authResult.isErr()) {
                setError(authResult.error.message as string);

                return;
            }

            const authContext: AuthContextType = queryClient.getQueryData(authQueryKey) as AuthContextType;

            authContext.authenticated = true;
            authContext.resource = { ...authResult.value };

            queryClient.setQueryData(
                authQueryKey,
                authContext,
                {
                    updatedAt: dayjs(new Date()).valueOf()
                }
            );

            await navigate({
                to: paths.root
            });
        },
        validators: {
            onChange: credentialSchema
        }
    });

    const isDisabled = (): boolean => isPending;

    /**
     * On unmount, cleanup function to abort the
     * request if the component unmounts.
     */
    React.useEffect(
        (): VoidFunction => {
            return (): void => {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
            };
        },
        []
    );

    return (
        <div className="m-auto w-fit max-sm:max-w-sm md:min-w-100">
            {!!error && (
                <div className="mb-6">
                    <Alert color="failure"
                        icon={BsExclamationSquareFill}
                    >
                        {error}
                    </Alert>
                </div>
            )}
            <div className="mx-auto w-full">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mx-auto mt-10 w-full">
                <form
                    key="f1"
                    className="w-full space-y-6"
                    noValidate={true}
                    onSubmit={async (e: FormEvent): Promise<void> => {
                        e.preventDefault();
                        e.stopPropagation();
                        await CredentialForm.handleSubmit();
                    }}
                >
                    <CredentialForm.Field
                        children={field => {
                            const fieldUsernameInError: boolean = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div>
                                    <label className="block text-sm/6 font-medium text-gray-900"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            autoFocus={true}
                                            disabled={isDisabled()}
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                field.handleChange(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <HelperText error={fieldUsernameInError}>
                                        <FieldInfo field={field} />
                                    </HelperText>
                                </div>
                            );
                        }}
                        name="username"
                    />
                    <CredentialForm.Field
                        children={field => {
                            const fieldPasswordInError: boolean = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div>
                                    <div>
                                        <label className="block text-sm/6 font-medium text-gray-900"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <Input
                                                autoComplete="current-password"
                                                disabled={isDisabled()}
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                type="password"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    field.handleChange(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <HelperText error={fieldPasswordInError}>
                                            <FieldInfo field={field} />
                                        </HelperText>
                                    </div>
                                </div>
                            );
                        }}
                        name="password"
                    />
                    <CredentialForm.Subscribe
                        // @ts-expect-error Issue with TanStack Form typings
                        children={([canSubmit, isSubmitting]) => (
                            <div>
                                <Button disabled={!canSubmit}
                                    loading={isPending || isSubmitting}
                                    type="submit"
                                >
                                    <span>
                                        Login
                                    </span>
                                </Button>
                            </div>
                        )}
                        // @ts-expect-error Issue with TanStack Form typings
                        selector={state => [state.canSubmit, state.isSubmitting]}
                    />
                </form>
                <Toast />
            </div>
        </div>
    );
};

export default Login;

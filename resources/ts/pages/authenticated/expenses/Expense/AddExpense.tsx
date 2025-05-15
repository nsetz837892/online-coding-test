import { FieldInfo } from '@/components/system/field-info';
import { Button } from '@/components/ui/flowbite/button';
import { HelperText } from '@/components/ui/helper-text';
import { DateTime } from '@/constants/date-time';
import { IntegerConsts } from '@/constants/numeric';
import { paths } from '@/constants/paths';
import { expenseService } from '@/domain/expense';
import { Container } from '@/layouts/app/container';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { getExpenseQueryKey, getExpenseSummaryQueryKey } from '@/state/query-keys/expense/keys';
import { AuthContext, Category, DomainError, Expense } from '@/types';
import { BsExclamationSquareFill } from '@react-icons/all-files/bs/BsExclamationSquareFill';
import { useForm } from '@tanstack/react-form';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { getRouteApi, NavigateFn, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Alert, Button as FlowBiteButton, Datepicker, Label, Select, TextInput } from 'flowbite-react';
import { Result } from 'neverthrow';
import React, { FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

/**
 * Manually accessing the Route API for the expense add route.
 */
const route = getRouteApi('/_authenticated/expenses/add-expense');

type FormData = {
    amount: string;
    categoryId: string;
    date: string;
    description: string | null | undefined;
};

type AddExpenseFC = React.FC;

/**
 * AddExpense renders an entity form for the Expense domain.
 *
 * Amount [number] - Required
 * Category [number] - Required
 * Description [string] - Nullable
 * Date [string] - Required
 *
 * @constructor
 */
const AddExpense: AddExpenseFC = (): React.ReactNode => {
    const queryClient: QueryClient = useQueryClient();
    const navigate: NavigateFn = useNavigate({ from: paths.authenticated.expenses.add });

    const abortControllerRef: React.RefObject<AbortController | null> = React.useRef(null);

    const { page, categoryId } = route.useSearch();

    const authContext: AuthContext = queryClient.getQueryData(getAuthQueryKey()) as AuthContext;

    const categories: Category[] = route.useLoaderData();

    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
    const [isPending, setIsPending] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    /*
     * Validation schema for the expense entity form.
     */
    const expenseSchema = z.object({
        categoryId: z.string().min(
            1,
            'Category is required'
        ),
        description: z.string(),
        date: z.
            string().
            min(
                1,
                'Date is required'
            ).
            regex(
                /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
                'Date is not a valid'
            ),
        amount: z.
            string().
            min(
                1,
                'Amount is required'
            ).
            regex(
                /^\d{1,8}(?:\.\d{1,2})?$/,
                'Amount is not a valid'
            )
    });

    /*
     * Expense entity form.
     */
    const ExpenseForm = useForm({
        defaultValues: {
            amount: '',
            categoryId: !!categoryId
                ? String(categoryId)
                : '',
            date: dayjs().format(DateTime.MYSQL),
            description: ''
        },
        onSubmit: async ({ value }: { value: FormData }): Promise<void> => {
            setIsPending(true);
            setError('');

            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();

            const result: Result<Expense, DomainError> = await expenseService.create(
                {
                    amount: parseFloat(value.amount),
                    categoryId: +value.categoryId,
                    date: value.date,
                    description: value.description
                },
                abortControllerRef.current.signal
            );

            setIsPending(false);

            if (result.isErr()) {
                setError(result.error.message as string);
                return;
            }

            queryClient.removeQueries({
                queryKey: getExpenseQueryKey(
                    authContext?.resource?.id,
                    {
                        paginate: true,
                        page: 1,
                        perPage: IntegerConsts.FIFTEEN
                    }
                ),
                exact: false
            });

            queryClient.removeQueries({ queryKey: getExpenseSummaryQueryKey(authContext?.resource?.id) });

            toast.success(`Created expense "${result.value.description ?? ''}" successfully.`);

            await navigate({
                to: paths.authenticated.expenses.root,
                search: {
                    page,
                    categoryId
                }
            });
        },
        validators: {
            onChange: expenseSchema
        }
    });

    /**
     * Disable controls if the component is in a
     * pending state.
     */
    const isDisabled = (): boolean => isPending;

    /**
     * Calls a clean-up function that aborts the
     * request if the component unmounts.
     */
    React.useEffect(
        (): VoidFunction => {
            if (!authContext) {
                void navigate({
                    to: paths.root
                });
            }

            return (): void => {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
            };
        },
        [authContext, navigate]
    );

    return (
        <Container>
            <div className="grid grid-cols-1 grid-rows-1 gap-2 overflow-x-auto p-2 md:grid-cols-2">
                <div className="flex items-center justify-start">
                    <h3 className="mb-4 text-2xl font-extrabold dark:text-blue-400">
                        Add Expense
                    </h3>
                </div>
                <div className="flex items-center justify-end">
                    <FlowBiteButton
                        onClick={async (): Promise<void> => {
                            await navigate({
                                to: paths.authenticated.expenses.root,
                                search: {
                                    page,
                                    categoryId
                                }
                            });
                        }}
                    >
                        Cancel
                    </FlowBiteButton>
                </div>
            </div>
            <div className="mt-6 rounded-lg bg-gray-100 p-6 sm:mx-auto sm:w-full sm:max-w-md">
                {!!error && (
                    <div className="mb-6">
                        <Alert color="failure"
                            icon={BsExclamationSquareFill}
                        >
                            {error}
                        </Alert>
                    </div>
                )}
                <form
                    key="f1"
                    className="space-y-6"
                    noValidate={true}
                    onSubmit={async (e: FormEvent): Promise<void> => {
                        e.preventDefault();
                        e.stopPropagation();
                        await ExpenseForm.handleSubmit();
                    }}
                >
                    <ExpenseForm.Field
                        children={field => {
                            const fieldCategoryInError: boolean = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div className="max-w-md">
                                    <div className="mb-2 block">
                                        <Label htmlFor="categoryId"
                                            color={fieldCategoryInError
                                                ? 'failure'
                                                : ''}
                                        >
                                            Category
                                        </Label>
                                    </div>
                                    <Select
                                        disabled={isDisabled()}
                                        id="categoryId"
                                        name="categoryId"
                                        value={field.state.value}
                                        color={fieldCategoryInError
                                            ? 'failure'
                                            : ''}
                                        onBlur={field.handleBlur}
                                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                            field.handleChange(event.target.value);
                                        }}
                                    >
                                        <option value="">
                                            Category
                                        </option>
                                        {categories?.map((category: Category) => (
                                            <option key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <HelperText error={fieldCategoryInError}>
                                        <FieldInfo field={field} />
                                    </HelperText>
                                </div>
                            );
                        }}
                        name="categoryId"
                    />
                    <ExpenseForm.Field
                        children={field => {
                            const fieldDescriptionInError: boolean = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description"
                                            color={fieldDescriptionInError
                                                ? 'failure'
                                                : ''}
                                        >
                                            Description
                                        </Label>
                                    </div>
                                    <TextInput
                                        disabled={isDisabled()}
                                        id="description"
                                        value={field.state.value}
                                        color={fieldDescriptionInError
                                            ? 'failure'
                                            : ''}
                                        onBlur={field.handleBlur}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            field.handleChange(event.target.value);
                                        }}
                                    />
                                    <HelperText error={fieldDescriptionInError}>
                                        <FieldInfo field={field} />
                                    </HelperText>
                                </div>
                            );
                        }}
                        name="description"
                    />
                    <ExpenseForm.Field
                        children={field => {
                            const fieldAmountInError: boolean = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="amount"
                                                color={fieldAmountInError
                                                    ? 'failure'
                                                    : ''}
                                            >
                                                Amount
                                            </Label>
                                        </div>
                                        <TextInput
                                            disabled={isDisabled()}
                                            id="amount"
                                            value={field.state.value}
                                            color={fieldAmountInError
                                                ? 'failure'
                                                : ''}
                                            onBlur={field.handleBlur}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                field.handleChange(event.target.value);
                                            }}
                                        />
                                        <HelperText error={fieldAmountInError}>
                                            <FieldInfo field={field} />
                                        </HelperText>
                                    </div>
                                </div>
                            );
                        }}
                        name="amount"
                    />
                    <ExpenseForm.Field
                        children={field => {
                            const fieldDateInError: boolean = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                            return (
                                <div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label color={fieldDateInError
                                                ? 'failure'
                                                : ''}
                                            >
                                                Date
                                            </Label>
                                        </div>
                                        <TextInput
                                            id="date"
                                            type="hidden"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                field.handleChange(event.target.value);
                                            }}
                                        />
                                        <Datepicker
                                            autoHide={true}
                                            maxDate={new Date()}
                                            value={dateValue}
                                            color={fieldDateInError
                                                ? 'failure'
                                                : ''}
                                            onChange={(date: Date | null) => {
                                                setDateValue(date);
                                                if (date) {
                                                    ExpenseForm.setFieldValue(
                                                        'date',
                                                        dayjs(date).format(DateTime.MYSQL)
                                                    );
                                                }
                                            }}
                                        />
                                        <HelperText error={fieldDateInError}>
                                            <FieldInfo field={field} />
                                        </HelperText>
                                    </div>
                                </div>
                            );
                        }}
                        name="date"
                    />
                    <ExpenseForm.Subscribe
                        // @ts-expect-error Issue with TanStack Form
                        children={([canSubmit, isSubmitting]) => (
                            <div className="mt-10">
                                <Button disabled={!canSubmit}
                                    loading={isPending || isSubmitting}
                                    type="submit"
                                >
                                    <span>
                                        Submit
                                    </span>
                                </Button>
                            </div>
                        )}
                        // @ts-expect-error Issue with TanStack Form
                        selector={state => [state.canSubmit, state.isSubmitting]}
                    />
                </form>
            </div>
        </Container>
    );
};

export { AddExpense };

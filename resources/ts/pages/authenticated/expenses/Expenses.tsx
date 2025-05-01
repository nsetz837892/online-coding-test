import { IntegerConsts } from '@/constants/numeric';
import { Container } from '@/layouts/app/container';
import { Filters } from '@/pages/authenticated/expenses/Filters';
import { Listing } from '@/pages/authenticated/expenses/Listing';
import { Summary } from '@/pages/authenticated/expenses/Summary';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { getExpenseQueryKey, getExpenseSummaryQueryKey } from '@/state/query-keys/expense/keys';
import { expenseQueryOptions } from '@/state/query-options/expenses/options';
import { AuthContext, Summary as SummaryType } from '@/types';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { Await, getRouteApi } from '@tanstack/react-router';
import { Spinner } from 'flowbite-react';
import React, { memo } from 'react';

/**
 * Manually accessing the Route API for the expense route.
 */
const route = getRouteApi('/_authenticated/expenses/');

type ExpensesFC = React.FC;

/**
 * Expenses lists a users' expenses, most recent first.
 *
 * The page renders a summary of the users' expenses.
 *
 * The page exposes a set of filter controls - filter
 * by expense category.
 *
 * @todo implement a sort function on [selected] columns
 * @todo implement a filter on the date column
 * @todo implement a column for actions [edit|delete]
 *
 * @constructor
 */
const Expenses: ExpensesFC = memo((): React.ReactNode => {
    const queryClient: QueryClient = useQueryClient();

    const { page: searchPage, categoryId } = route.useSearch();

    const authContext: AuthContext = queryClient.getQueryData(getAuthQueryKey()) as AuthContext;

    const { deferredData } = route.useLoaderData();

    const [page, setPage] = React.useState<number>(searchPage
        ? parseInt(
            searchPage as string,
            10
        )
        : 1);

    const [category, setCategory] = React.useState<string>(!!categoryId
        ? String(categoryId)
        : '');

    /**
     * handleChangePage is the event handler
     * to the Listing component onChangePage event.
     */
    const handleChangePage = (page: number) => {
        setPage(page);
    };

    /**
     * handleDelete is the event handler
     * to the Listing component onDelete event.
     *
     * Refetch the listings for the expense domain.
     * Refetch the summary for the expense domain.
     */
    const handleDelete = async (): Promise<void> => {
        await queryClient.refetchQueries({
            queryKey: getExpenseQueryKey(
                authContext.resource.id,
                {
                    paginate: true,
                    page: 1,
                    perPage: IntegerConsts.FIFTEEN
                }
            ),
            exact: false
        });

        await queryClient.refetchQueries({ queryKey: getExpenseSummaryQueryKey(authContext.resource.id) });

        setPage(1);
    };

    /**
     * handleChangePage is the event handler
     * to the Filters component onFiltersSubmit event.
     */
    const handleFiltersSubmit = React.useCallback(
        (category: string): void => {
            setCategory(category);
            setPage(1);
        },
        []
    );

    /**
     * Get the next expense listing paginated.
     */
    const { status, data, error, isPlaceholderData } = useQuery(expenseQueryOptions(
        authContext?.resource?.id,
        page,
        IntegerConsts.FIFTEEN,
        category
            ? parseInt(
                category,
                10
            )
            : undefined
    ));

    /**
     * On mount, prefetch the next page -
     * but only if there are more than one pages and the
     * current page is not the last page.
     */
    React.useEffect(
        () => {
            if (!!authContext && !isPlaceholderData && (data?.meta?.lastPage ?? 0) > 1 && data?.meta?.currentPage !== data?.meta?.lastPage) {
                void queryClient.prefetchQuery(expenseQueryOptions(
                    authContext?.resource?.id,
                    page + 1,
                    IntegerConsts.FIFTEEN,
                    category
                        ? parseInt(
                            category,
                            10
                        )
                        : undefined
                ));
            }
        },
        [authContext, data, isPlaceholderData, page, category, queryClient]
    );

    return (
        <Container>
            <h3 className="mb-4 text-2xl font-extrabold dark:text-blue-400">
                Expenses
            </h3>
            <Await fallback={<Spinner size="sm" />}
                promise={deferredData}
            >
                {(data: SummaryType) => (
                    <div className="mb-2">
                        <Summary
                            spent={data.spent}
                            total={data.total}
                            search={{
                                categoryId: !!category
                                    ? +category
                                    : undefined,
                                page
                            }}
                        />
                    </div>
                )}
            </Await>
            {status === 'pending'
                ? (
                    <div>
                        <Spinner />
                    </div>
                )
                : status === 'error'
                    ? (
                        <div>
                            Error:
                            {error.message}
                        </div>
                    )
                    : (
                        <React.Fragment>
                            <Filters onFiltersSubmit={handleFiltersSubmit} />
                            <Listing data={data}
                                onChangePage={handleChangePage}
                                onDelete={handleDelete}
                            />
                        </React.Fragment>
                    )}
        </Container>
    );
});

export { Expenses };

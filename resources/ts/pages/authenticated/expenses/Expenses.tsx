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
 * Manually accessing the Route API for the expenses route.
 */
const route = getRouteApi('/_authenticated/expenses/');

type ExpensesFC = React.FC;

/**
 * Expenses is a memoized functional component that represents the expense management interface in the application.
 * It displays a summary of expenses, allows filtering by categories, handles pagination for expense listings, and
 * provides options to delete entries.
 *
 * The component is built using the following functionalities:
 * - Retrieves user authentication context and query client for data fetching and management.
 * - Initializes state for page and category filters based on the current search parameters.
 * - Handles events for updating the page, applying filters, and deleting entries.
 * - Fetches expense data, including paginated listings and summary details, using react query.
 * - Prefetches the next page of data for optimisation if applicable.
 *
 * Features:
 * - Pagination: Allows navigation between pages of expense listings.
 * - Filtering: Enables filtering expenses by category.
 * - Deletion: Triggers deletion of expense entries and refreshes relevant queries.
 * - Summary Display: Shows an overview of expenses.
 *
 * Lifecycle:
 * - On mount, prefetches the next page of expenses data if conditions are met.
 * - Updates data and pagination state based on user actions such as filtering or moving between pages.
 *
 * Renders:
 * - A `Summary` component showing spent and total expenses.
 * - A loading spinner or error message during data fetching errors.
 * - `Filters` and `Listing` components for managing and displaying expense data.
 *
 * @todo implement a sort function on [selected] columns
 * @todo implement a filter on the date column
 * @todo implement a column for actions [edit|delete]
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

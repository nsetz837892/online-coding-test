import { Button, ButtonElement } from '@/components/ui/flowbite/button';
import { DateTime } from '@/constants/date-time';
import { expenseService } from '@/domain/expense';
import { useRefs } from '@/hooks/use-refs';
import { ApiPaginated, Deleted, DomainError, Expense, Meta } from '@/types';
import dayjs from 'dayjs';
import { Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Result } from 'neverthrow';
import React, { memo } from 'react';
import { toast } from 'react-hot-toast';

/**
 * A React memoized functional component that renders a row in a table to display
 * a "No Content" message when there are no expenses available.
 *
 * This component is typically used in tables where data is expected, indicating
 * to the user that no expenses are currently present and providing a brief guide
 * on how to add one.
 *
 * The displayed message is styled appropriately for light and dark themes.
 */
const NoContent = memo(function NoContent (): React.ReactNode {
    return (
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell align="center"
                className="font-medium whitespace-nowrap text-gray-900 dark:text-white"
                colSpan={6}
            >
                <p className="mb-4 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    You currently have no expenses
                </p>
                <p>
                    To add an expense, click on the
                    {' '}
                    <span className="font-bold">
                        Add Expense
                    </span>
                    {' '}
                    button in the expense summary pane.
                </p>
            </TableCell>
        </TableRow>
    );
});

type ListingContainerProps = {
    /**
     * Represents the children elements to be rendered inside a React component.
     * This can include any valid React nodes, such as elements, components,
     * fragments, strings, or numbers.
     */
    children?: React.ReactNode | undefined;
    /**
     * Represents the metadata associated with a specific data set.
     */
    meta: Meta;
    /**
     * Callback function triggered when the current page changes.
     *
     * @param page - The new page number to navigate to.
     */
    onChangePage?: (page: number) => void;
};

type ListingContainerFC = React.FC<ListingContainerProps>;

/**
 * A functional component that acts as a container for a paginated listing of items.
 *
 * The component renders a table structure for displaying table headers and data rows,
 * along with pagination controls and metadata about the visible items within the list.
 *
 * @returns {React.ReactNode} The rendered listing container with table and pagination controls.
 */
const ListingContainer: ListingContainerFC = memo(({ children, meta, onChangePage }: ListingContainerProps): React.ReactNode => {
    /**
     * Callback function to handle page change events.
     *
     * This function is triggered when a page change occurs and executes
     * the provided `onChangePage` callback if it is a valid function.
     *
     * Dependencies:
     * - `onChangePage`: The callback function provided as a dependency,
     *   which is executed with the new page number as its argument.
     *
     * @param {number} page - The number of the page to navigate to.
     */
    const onPageChange = React.useCallback(
        (page: number) => {
            if (typeof onChangePage === 'function') {
                onChangePage(page);
            }
        },
        [onChangePage]
    );

    return (
        <div className="overflow-x-auto">
            <Table className="w-full table-fixed">
                <TableHead>
                    <TableRow>
                        <TableHeadCell className="w-10">
                            ID
                        </TableHeadCell>
                        <TableHeadCell className="w-40">
                            Date
                        </TableHeadCell>
                        <TableHeadCell align="center"
                            className="w-40"
                        >
                            Amount
                        </TableHeadCell>
                        <TableHeadCell className="w-60">
                            Category
                        </TableHeadCell>
                        <TableHeadCell className="w-60">
                            Description
                        </TableHeadCell>
                        <TableHeadCell align="right"
                            className="w-20"
                        >
                            <span className="sr-only">
                                Edit
                            </span>
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                {children}
            </Table>
            <div className="grid grid-cols-1 grid-rows-1 gap-2 overflow-x-auto md:grid-cols-2">
                <div className="flex items-center justify-start max-sm:mt-2 max-sm:justify-center">
                    {`Showing ${String(meta?.from ?? 1)} to ${String(meta?.to ?? 1)} of ${String(meta?.total ?? 1)} Entries`}
                </div>
                <div className="flex items-center justify-end max-sm:justify-center">
                    <Pagination currentPage={meta.currentPage ?? 1}
                        totalPages={meta.lastPage ?? 0}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
});

export type ListingProps = {
    /*
     * Paginated listing of expense entity.
     */
    data: ApiPaginated<Expense>;
    /*
     * Event handler to the paginator
     */
    onChangePage?: (page: number) => void;
    /*
     * Event handler to a delete action
     */
    onDelete?: (id: number) => void;
};

type ListingFC = React.FC<ListingProps> & {
    /**
     * Container is a React functional component that serves as a listing container
     * for expense listing. The Container component is a compound component.
     *
     * @type {ListingContainerFC}
     */
    Container: ListingContainerFC;
};

/**
 * Listing is a functional component that displays a paginated and interactive table of data, such as expenses.
 *
 * @type {React.FunctionComponent}
 *
 * @description
 * - This component renders a table-based UI displaying a list of items (e.g. expenses).
 * - Includes features like delete actions, row-wise handling, and pagination support.
 * - Leveraging React state and refs for optimisation and interaction management.
 *
 * @remarks
 * - Aborts ongoing delete requests if a new delete action is invoked or the component unmounts.
 * - Renders child components such as `TableBody`, `TableRow`, `TableCell`, and action buttons.
 * - Utilizes React hooks `useRef` and `useEffect` for managing abort controllers and side effects.
 */
const Listing: ListingFC = ({ data, onChangePage, onDelete }: ListingProps): React.ReactNode => {
    const abortControllerRef: React.RefObject<AbortController | null> = React.useRef(null);

    const { refsByKey, setRef } = useRefs<ButtonElement>();

    /**
     * handleDelete proxies the delete action event.
     */
    const handleDelete = async (id: number): Promise<void> => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        const result: Result<Deleted, DomainError> = await expenseService.deleteOne(id);

        refsByKey?.[id]?.setLoading(false);

        if (result.isErr()) {
            toast.error(result.error.message as string);

            return;
        }

        toast.success('Deleted successfully.');

        if (typeof onDelete === 'function') {
            onDelete(id);
        }
    };

    /**
     * Calls a clean-up function that aborts
     * a request if the component unmounts.
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
        <Listing.Container meta={data.meta}
            onChangePage={onChangePage}
        >
            <TableBody className="divide-y">
                {Array.isArray(data?.data) && data.data.length === 0 && <NoContent />}
                {((data?.data ?? []) as Expense[]).map((expense: Expense, index: number) => (
                    <TableRow key={expense.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <TableCell className="w-10 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                            {expense.id}
                        </TableCell>
                        <TableCell className="w-40">
                            {dayjs(expense.date).format(DateTime.LOCALISED)}
                        </TableCell>
                        <TableCell align="center"
                            className="w-40"
                        >
                            {expense.amount}
                        </TableCell>
                        <TableCell className="w-60">
                            {expense.category.name}
                        </TableCell>
                        <TableCell className="w-auto">
                            <span className="line-clamp-2">
                                {expense.description}
                            </span>
                        </TableCell>
                        <TableCell align="right"
                            className="w-20"
                        >
                            <Button
                                ref={(element: ButtonElement) => {
                                    setRef(
                                        element,
                                        String(expense.id)
                                    );

                                    return () => {
                                        if (refsByKey[index]) {
                                            refsByKey[index].setLoading(false);
                                        }
                                    };
                                }}
                                color="default"
                                hidden={true}
                                variant="text"
                                onClick={async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
                                    event.preventDefault();

                                    refsByKey?.[expense.id]?.setLoading(true);

                                    await handleDelete(expense.id);
                                }}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Listing.Container>
    );
};

Listing.Container = ListingContainer;

export { Listing };

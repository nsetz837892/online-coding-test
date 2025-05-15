import { Button, ButtonElement } from '@/components/ui/flowbite/button';
import { DateTime } from '@/constants/date-time';
import { expenseService } from '@/domain/expense';
import { useRefs } from '@/hooks/use-refs';
import EventBus from '@/support/event-bus';
import { ApiPaginated, Deleted, DomainError, Expense, Meta } from '@/types';
import dayjs from 'dayjs';
import { Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Result } from 'neverthrow';
import React, { memo } from 'react';
import { toast } from 'react-hot-toast';

/**
 * NoContent is a memoized table row
 * showing a no-content message.
 */
const NoContent = memo(function NoContent () {
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
    /*
     * Body
     */
    children?: React.ReactNode | undefined;
    /*
     * Pagination meta
     */
    meta: Meta;
    /*
     * Event handler - proxies the change page event
     */
    onChangePage?: (page: number) => void;
};

type ListingContainerFC = React.FC<ListingContainerProps>;

/**
 * ListingContainer renders a table container.
 *
 * Memoize the container - to prevent re-renders when the
 * parent component re-renders.
 *
 * @constructor
 */
const ListingContainer: ListingContainerFC = memo(({ children, meta, onChangePage }: ListingContainerProps): React.ReactNode => {
    /**
     * onPageChange is an event handler for the
     * Pagination component onPageChange event.
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

export const eventBus = new EventBus<{ page: number }>();

export type ListingProps = {
    /*
     * Paginated listing of expense entity.
     */
    data: ApiPaginated<Expense>;
    /*
     * Event handler to a delete action
     */
    onDelete?: (id: number) => void;
};

type ListingFC = React.FC<ListingProps> & {
    Container: ListingContainerFC;
};

/**
 * Listing renders Expense entity tabulated.
 *
 * @constructor
 */
const Listing: ListingFC = ({ data, onDelete }: ListingProps): React.ReactNode => {
    const abortControllerRef: React.RefObject<AbortController | null> = React.useRef(null);

    const { refsByKey, setRef } = useRefs<ButtonElement>();

    const changePage = (page: number) => {
        eventBus.emit(
            'changePage',
            { page }
        );
    };

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
            onChangePage={changePage}
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

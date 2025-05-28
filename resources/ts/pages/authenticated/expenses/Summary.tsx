import { paths } from '@/constants/paths';
import { SearchParams } from '@/types';
import { NavigateFn, useNavigate } from '@tanstack/react-router';
import { Banner, Button } from 'flowbite-react';
import React, { memo } from 'react';

export type SummaryProps = {
    /*
     * Total spent
     */
    spent: number;
    /*
     * Number of expenses
     */
    total: number;
    /*
     * Search [query string] parameters
     */
    search?: SearchParams;
};

type SummaryFC = React.FC<SummaryProps>;

/**
 * SummaryFC is a stateless functional component that renders a summary display for expenses.
 * It shows the total amount spent and the number of expenses and provides a button to navigate
 * to the "Add Expense" section.
 *
 * @returns {React.ReactNode} A React component that renders the summary information and a navigation button.
 */
export const Summary: SummaryFC = memo(({ search, spent, total }: SummaryProps): React.ReactNode => {
    const navigate: NavigateFn = useNavigate();

    return (
        <Banner>
            <div className="flex w-full flex-col justify-between rounded-lg border-b border-gray-200 bg-gray-50 p-4 md:flex-row dark:border-gray-600 dark:bg-gray-700">
                <div className="mb-4 md:mr-4 md:mb-0">
                    <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                        Summary
                    </h2>
                    <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        <span>
                            Total Spent
                        </span>
                        <span className="ml-2 font-bold text-white">
                            {spent}
                        </span>
                    </p>
                    <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                        <span>
                            Number of expenses
                        </span>
                        <span className="ml-2 font-bold text-white">
                            {total}
                        </span>
                    </p>
                </div>
                <div className="flex shrink-0 items-center">
                    <Button
                        onClick={async (): Promise<void> => {
                            await navigate({
                                to: paths.authenticated.expenses.add,
                                search
                            });
                        }}
                    >
                        Add Expense
                    </Button>
                </div>
            </div>
        </Banner>
    );
});

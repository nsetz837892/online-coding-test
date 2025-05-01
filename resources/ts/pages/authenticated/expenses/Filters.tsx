import { Select } from '@/components/ui/flowbite/select';
import { useCategories } from '@/hooks/use-categories';
import { Category } from '@/types';
import { getRouteApi } from '@tanstack/react-router';
import { Button, Card } from 'flowbite-react';
import React, { memo } from 'react';

/**
 * Manually accessing the Route API for the expense route.
 */
const route = getRouteApi('/_authenticated/expenses/');

export type FiltersProps = {
    onFiltersSubmit?: (category: string) => void;
};

type FiltersFC = React.FC<FiltersProps>;

/**
 * Filters renders a common set of filter controls.
 *
 * Establish a reference to the DOM element for the
 * select control -- to avoid managing the select component.
 *
 * @constructor
 */
const Filters: FiltersFC = memo(function Filters ({ onFiltersSubmit }: FiltersProps): React.ReactNode {
    const categories: Category[] = useCategories();

    const { categoryId } = route.useSearch();

    const selectRef: React.RefObject<HTMLSelectElement | null> = React.useRef<HTMLSelectElement | null>(null);

    const [showFilters, setShowFilters] = React.useState<boolean>(false);

    /**
     * handleApply is an event handler to the filter
     * apply button.
     *
     * Proxy the event handler to the parent component -
     * passing the selected category.
     */
    const handleApply = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            setShowFilters(false);

            if (typeof onFiltersSubmit === 'function' && typeof selectRef?.current?.value === 'string') {
                onFiltersSubmit(selectRef?.current?.value);
            }
        },
        [onFiltersSubmit]
    );

    /**
     * On mounting, set the category select control to the
     * search param for category ID.
     */
    React.useEffect(
        (): void => {
            if (selectRef.current) {
                selectRef.current.value = categoryId ?? '';
            }
        },
        [categoryId]
    );

    return (
        <Card className="my-4">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-2">
                <div className="grid content-center md:col-span-1">
                    {showFilters && <span className="text-cyan-500">
                        Filters have changed. Click the Apply button to action the change!
                    </span>}
                </div>
                <div className="grid content-center md:col-span-1 md:place-items-end">
                    <form className="flex flex-row gap-4">
                        <div>
                            <Select
                                ref={selectRef}
                                id="category"
                                value={categoryId ?? ''}
                                onChange={(): void => {
                                    setShowFilters(true);
                                }}
                            >
                                <option value="">
                                    Category
                                </option>
                                {categories.map((category: Category) => (
                                    <option key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Button onClick={handleApply}>
                                Apply
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Card>
    );
});

Filters.displayName = 'Filters';

export { Filters };

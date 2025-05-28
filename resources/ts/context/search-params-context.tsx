import { SearchParams } from '@/types';
import React from 'react';

export type SearchParamsContextType = {
    searchParams: SearchParams | null;
    setSearchParams: (params: SearchParams | null) => void;
};

const SearchParamsContext: React.Context<SearchParamsContextType> = React.createContext<SearchParamsContextType>({
    searchParams: null,
    setSearchParams: (): void => {
        //
    }
});

export type SearchParamsProviderProps = {
    children: React.ReactNode | undefined;
};

/**
 * SearchParamsProvider
 *
 * @constructor
 */
const SearchParamsProvider = ({ children }: SearchParamsProviderProps): React.ReactElement => {
    const [params, setParams] = React.useState<SearchParams | null>(null);

    const setSearchParams = (params: SearchParams | null): void => {
        setParams(params !== null
            ? { ...params }
            : null);
    };

    return (
        <SearchParamsContext
            value={{
                searchParams: params,
                setSearchParams
            }}
        >
            {children}
        </SearchParamsContext>
    );
};

export { SearchParamsContext, SearchParamsProvider };

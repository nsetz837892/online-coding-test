export const ApiPaginatedDto = {
    success: false,
    message: 'No results found',
    status: 200,
    data: null,
    meta: {
        currentPage: 1,
        from: null,
        lastPage: null,
        path: null,
        perPage: 15,
        to: null,
        total: 0,
        links: []
    },
    links: {
        first: null,
        last: null,
        next: null,
        prev: null
    },
    errors: []
};

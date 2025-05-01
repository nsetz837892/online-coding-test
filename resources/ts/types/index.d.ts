import { QueryClient } from '@tanstack/react-query';
import type { Config } from 'ziggy-js';
import { ZodError } from 'zod';

export type Falsy = null | undefined | false | 0 | 0n | '';

export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type ObjectLiteral = Record<PropertyKey, unknown>;

export type Ziggy<QType extends object = null> = Omit<Config, 'location'> & {
    location: string;
    query: QType;
};

export type RouterContext = {
    queryClient: QueryClient;
};

export type ConfigKey = PropertyKey;
export type ConfigValue = object | string | number | string[] | number[] | boolean | null | undefined;

export type Config = Record<ConfigKey, ConfigValue>;

export type PathKey = string;
export type PathValue = string;

export type Paths = Record<PathKey, Paths> | Record<PathKey, PathValue>;

export type Deleted = { deleted: boolean };

export type Pagination = {
    paginate?: boolean;
    page?: number;
    perPage?: number;
    orderBy?: string;
    orderDir?: string;
    cache?: boolean;
};

export type Filter = {
    fields?: string;
    keyword?: string;
    categoryId?: number;
    term?: string;
};

export type Resource = Filter & Pagination;

export type Credentials = {
    username: string;
    password: string;
};

export type Link = {
    url: null | string;
    label: string;
    active: boolean;
};

export type Meta = {
    currentPage: number | null;
    from: number | null;
    lastPage: number | null;
    path: string | null;
    perPage: number | null;
    to: number | null;
    total: number | null;
    links?: Link[];
};

export type Links = {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
};

export type DomainError<E extends Error = Error> = {
    code?: string;
    error?: E;
    message?: string;
    type: string;
    status?: number;
};

export type ApiError = {
    message: string;
    code?: string;
};

export type Api<DType = unknown> = {
    message?: string;
    success: boolean;
    status?: number;
    errors?: ApiError[];
    data: DType | DType[] | null;
};

export type ApiPaginated<DType = ObjectLiteral> = Api<DType> & {
    meta: Meta;
    links: Links;
};

export type RouteGroup = {
    id: string;
    render: boolean; // Render the group in menus
    routes: Route[];
    name?: string;
    title?: string;
    path?: string;
    permissions?: string[];
};

export type Route = {
    id: string;
    name: string;
    title: string;
    path: string;
    permissions: string[];
    children?: Route[];
    renderChildren?: boolean; // Render the children in menus as menu options
    renderSelf?: boolean; // Render the parent root in the children menu options
};

export type Permission = {
    id: number;
    name: string;
};

export type Role = {
    id: number;
    name: string;
    permissions: string[];
};

export type Country = {
    id: number;
    name: string;
    alpha2Code: string;
    active?: boolean;
};

export type User = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    avatar?: string;
    emailVerifiedAt: string | null;
    createdAt: string;
    updatedAt?: string | null;
    verified: boolean;
    country: Country;
    role: Role;
};

export type ZodSafeResults<T> = {
    success: boolean;
    data?: T | undefined;
    error?: ZodError | Falsy;
};

export type Category = {
    id: number;
    name: string;
};

export type Expense = {
    id: number;
    description: string | null;
    amount: number;
    category: Category;
    date: string;
    createdAt: string;
    updatedAt?: string | null;
};

export type Summary = {
    spent: number;
    total: number;
};

export type AuthResource = {
    id: number;
    name: string;
    email: string;
    role: Role;
};

export type AuthContext = {
    authenticated: boolean;
    resource: AuthResource;
};

export type SearchParams = {
    paginate?: boolean;
    page?: number;
    perPage?: number;
    sortBy?: string;
    desc?: boolean;
    categoryId?: number;
};

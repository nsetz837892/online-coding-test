import { ObjectLiteral, Resource } from '@/types';

/**
 * ServiceHelper exposes an interface.
 */
export type ServiceHelper = {
    /**
     * Get a path by delimited string.
     * @param {string} path A delimited string, for example 'authenticated.root'
     */
    getPath: (path: string) => string;
    /**
     * Get a path by delimited string with a query string component.
     * @param {string} path A delimited string, for example, 'authenticated.root'
     * @param {Resource} queryData Query string keys and values
     */
    getQueryPath: (path: string, queryData: Resource, excludeEmpty?: boolean) => string;
    /**
     * Get a path by delimited string and parse path parameters.
     * @param {string} path A delimited string, for example, 'authenticated.root'
     * @param {ObjectLiteral} replacements Keys are paths params and values are path param values.
     */
    getParameterPath: (path: string, replacements: ObjectLiteral) => string;
};

import { endpoints } from '@/domain/constants';
import { ServiceHelper } from '@/domain/types';
import { placeholderReplace } from '@/support/utils';
import { ObjectLiteral, Paths, Primitive, Resource } from '@/types';

/**
 * _get_path gets the value at a path of an object.
 * If the resolved value is an object, an empty
 * string is returned.
 */
function _get_path (paths: Paths, path: string | string[]): string | undefined {
    const nodes: string[] = typeof path === 'string'
        ? path.split('.')
        : Array.isArray(path)
            ? path.slice()
            : [];

    const value: unknown = nodes.reduce(
        (p, k) => p?.[k] as unknown,
        paths
    );

    if (typeof value === 'string') {
        return value;
    }

    return;
}

/**
 * Type cast a query string value into a string.
 *
 * Returns an empty string if the value is not a string, boolean, or number.
 */
function _parse_query_string_value (value: Primitive): string {
    if (typeof value === 'string') {
        return value;
    }

    /*
     * Type cast boolean values to '1' or '0'.
     */

    if (typeof value === 'boolean') {
        return value
            ? '1'
            : '0';
    }

    /*
     * Type cast number values to a string type.
     */

    return typeof value === 'number'
        ? String(value)
        : '';
}

/**
 * _parse_resource parses a query string resource object into a query string.
 * @param {string} path A delimited string, for example, 'authenticated.root'
 * @param {Resource} queryData Query string keys and values
 * @param {boolean|undefined} excludeEmpty Exclude keys when the value resolves to an empty string
 */
function _parse_resource (path: string, queryData: Resource, excludeEmpty: boolean = true): string {
    const queryString: string = Object.entries(queryData).reduce(
        (qs: string, [key, val]: [string, string | number | boolean]) => {
            const parsedValue: string = _parse_query_string_value(val);

            return parsedValue === '' && excludeEmpty
                ? qs
                : `${qs}&${encodeURIComponent(key)}=${encodeURIComponent(_parse_query_string_value(val))}`;
        },
        ''
    );

    return `${path}?${queryString.replace(
        /^&/,
        ''
    )}`;
}

/**
 * @inheritDoc
 * @see ServiceHelper
 */
export const serviceHelper: ServiceHelper = {
    getPath: (path: string): string => _get_path(
        endpoints,
        path
    ) ?? '',
    getQueryPath: (path: string, queryData: Resource): string => _parse_resource(
        _get_path(
            endpoints,
            path
        ) ?? '',
        queryData
    ),
    getParameterPath: (path: string, replacements: ObjectLiteral): string => placeholderReplace(
        _get_path(
            endpoints,
            path
        ) ?? '',
        replacements
    )
};

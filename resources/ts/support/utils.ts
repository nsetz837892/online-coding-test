import { ObjectLiteral } from '@/types';

/**
 * Replace a path placeholder with a corresponding value.
 */
export const placeholderReplace = (value: string, replacements: ObjectLiteral): string => {
    return value.replace(/:([^/]+)/g, (match: string) => {
        if (replacements[match.substring(1, match.length)]) {
            return replacements[match.substring(1, match.length)] as string;
        }
        return match;
    });
};

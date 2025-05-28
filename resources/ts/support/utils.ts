import { ObjectLiteral } from '@/types';

/**
 * Replaces placeholders in a string with corresponding values from a replacement object.
 *
 * This function searches for placeholders in the form `:key` within the input string and replaces them with the
 * values provided in the `replacements` object. If a placeholder key exists as a property in the `replacements` object,
 * the placeholder is replaced with the associated value. If the key does not exist in `replacements`, the placeholder
 * is left intact.
 */
export const placeholderReplace = (value: string, replacements: ObjectLiteral): string => {
    return value.replace(
        /:([^/]+)/g,
        (match: string) => {
            if (replacements[match.substring(
                1,
                match.length
            )]) {
                return replacements[match.substring(
                    1,
                    match.length
                )] as string;
            }
            return match;
        }
    );
};

import { AnyFieldApi } from '@tanstack/react-form';
import React from 'react';

type FieldInfoProps = {
    field: AnyFieldApi | undefined;
    first?: boolean;
    defaultMessage?: string | null;
};

type FieldInfoComponent = React.FC<FieldInfoProps>;

/**
 * The `FieldInfo` component is a React functional component that handles the display of field-related information,
 * including error messages and validation status.
 *
 * @returns {React.ReactNode} React node representing either an error message, validation status, or `null` if no field
 *     is provided.
 */
const FieldInfo: FieldInfoComponent = ({ field, first = true }: FieldInfoProps): React.ReactNode => {
    function fieldErrorMessage (fieldApi: AnyFieldApi): string {
        return (fieldApi.state.meta.isTouched && fieldApi.state.meta.errors.length > 0
            ? fieldApi.state.meta.errors[0].message
            : '') as string;
    }

    if (!field) {
        return null;
    }

    if (field.state.meta.isValidating) {
        return <p>
            validating
        </p>;
    }

    return <span>
        {first
            ? fieldErrorMessage(field)
            : field.state.meta.errors.join(',')}
    </span>;
};

export { FieldInfo };

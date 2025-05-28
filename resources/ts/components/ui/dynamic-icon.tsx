import React, { ComponentType, Suspense } from 'react';
import { IconBaseProps } from '@react-icons/all-files/lib';
import { VscBlank } from '@react-icons/all-files/vsc/VscBlank';
import { MdOutlineDisabledByDefault } from '@react-icons/all-files/md/MdOutlineDisabledByDefault';

export type DynamicIconProps = {
    /*
     * Icon component name, such as MdOutlineDisabledByDefault
     */
    iconName: string;
    /*
     * React-Icons props to pass to the icon component.
     */
    iconProps?: IconBaseProps;
};

/**
 * DynamicIcon loads a React Icon dynamically by icon name.
 *
 * @constructor
 */
export const DynamicIcon = ({
    iconName,
    iconProps = { size: 24 }
}: DynamicIconProps): React.ReactNode | null => {
    /*
     * Infer the library from the file name.
     * Split the icon name by capital letters and
     * implement the first index of the resulting array
     * as the package library.
     */

    const [icon, library] = iconName.match(/^([A-Z]+[a-z]+)(.+)/) as RegExpMatchArray;

    if (!library || !icon) {
        return null;
    }

    const Icon: React.LazyExoticComponent<ComponentType> = React.lazy(() => import('./react-icons').then(module => {
        return { 'default': module[icon as keyof typeof module] };
    }));

    if (!Icon) {
        return <MdOutlineDisabledByDefault />;
    }

    return (
        <Suspense fallback={<VscBlank {...iconProps} />}>
            <Icon {...iconProps} />
        </Suspense>
    );
};

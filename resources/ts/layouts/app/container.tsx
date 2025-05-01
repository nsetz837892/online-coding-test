import React from 'react';

export type ContainerProps = { children?: React.ReactNode | undefined };

type ContainerFC = React.FC<ContainerProps>;

/**
 * Container is an app-wide content container.
 *
 * @constructor
 */
const Container: ContainerFC = ({ children }: ContainerProps) => <div className="justify-centertext-center container mx-auto flex h-auto flex-col content-center px-4 py-4">
    {children}
</div>;
export { Container };

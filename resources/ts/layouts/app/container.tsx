import React from 'react';

export type ContainerProps = { children?: React.ReactNode | undefined };

type ContainerFC = React.FC<ContainerProps>;

/**
 * Container component that serves as a wrapper for content and provides centralised styling.
 *
 * This component is designed to create a centered and responsive container with consistent padding
 * and flex properties. It accepts children elements and renders them within a styled `div` element.
 */
const Container: ContainerFC = ({ children }: ContainerProps) => <div className="justify-centertext-center container mx-auto flex h-auto flex-col content-center px-4 py-4">
    {children}
</div>;
export { Container };

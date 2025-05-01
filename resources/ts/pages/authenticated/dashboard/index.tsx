import { Container } from '@/layouts/app/container';
import React from 'react';

type IndexFC = React.FC;

/**
 * Index/Dashboard is the main landing page for authenticated users.
 *
 * @constructor
 */
const Index: IndexFC = (): React.ReactNode => {
    return (
        <Container>
            <h3 className="text-2xl font-extrabold dark:text-blue-400">
                Dashboard
            </h3>
            <p className="mb-3 pt-6 text-lg text-gray-500 md:text-xl dark:text-gray-400">
                Mauris sed tristique justo, tristique sollicitudin enim. Nunc eu placerat neque, et fringilla ex. Ut at gravida eros, sollicitudin
                accumsan mi. Morbi condimentum cursus est, in cursus sapien facilisis at. Quisque malesuada dignissim dolor a porta. Suspendisse
                venenatis tincidunt enim, ac porttitor massa mollis eget. Sed accumsan nulla sed nunc dignissim euismod.
            </p>
        </Container>
    );
};

export { Index };

import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Eslint Stylistic(v4) configuration.
 *
 * @link https://eslint.style/rules
 * @link https://typescript-eslint.io/rules/
 * @link https://github.com/jsx-eslint/eslint-plugin-react
 */
export default [
    stylistic.configs.all,
    ...tseslint.configs.strictTypeChecked,
    {
        ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**', 'assets/**', '**/*.js'],
    },
    {
        plugins: {
            '@stylistic': stylistic,
            react: reactPlugin,
            'react-hooks': reactHooks,
            eslintConfigPrettier,
            sonarjs, // @link https://github.com/SonarSource/eslint-plugin-sonarjs
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
    },
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: {
                    '@stylistic/jsx': true,
                    globalReturn: false,
                    impliedStrict: true,
                    jsx: true,
                },
                ecmaVersion: 2022,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            'no-multi-spaces': ['error', { ignoreEOLComments: false }],
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['@mui/*/*/*'],
                },
            ],
            '@stylistic/array-bracket-newline': ['error', { multiline: true }],
            '@stylistic/curly-newline': ['error', 'always'],
            '@stylistic/no-confusing-arrow': 'off',
            '@stylistic/object-curly-spacing': ['error', 'always'],
            /**
             * Stop padding inside function statements, etc.
             * @link  https://eslint.style/rules/default/padded-blocks
             */
            '@stylistic/padded-blocks': ['error', 'never'],
            '@stylistic/block-spacing': 'error',
            '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: true }],
            '@stylistic/quote-props': ['error', 'as-needed', { keywords: true, unnecessary: false }],
            '@stylistic/jsx-child-element-spacing': 'error',
            '@stylistic/type-generic-spacing': ['error'],
            '@stylistic/type-named-tuple-spacing': ['error'],
            '@stylistic/lines-around-comment': ['warn', { beforeBlockComment: false }],
            '@stylistic/array-element-newline': ['error', { multiline: true }],
            '@stylistic/no-extra-parens': ['error', 'all', { ignoreJSX: 'multi-line' }],
            '@stylistic/arrow-parens': ['error', 'as-needed'],
            '@typescript-eslint/only-throw-error': [
                'error',
                {
                    allow: [
                        {
                            from: 'package',
                            name: 'TankStack Router',
                            package: '@tanstack/react-router',
                        },
                    ],
                    allowThrowingAny: true,
                    allowThrowingUnknown: true,
                },
            ],
            '@typescript-eslint/no-unnecessary-condition': [
                'off',
                {
                    allowConstantLoopConditions: 'always',
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true,
                    checkTypePredicates: true,
                },
            ],
            '@typescript-eslint/no-floating-promises': [
                'error',
                {
                    allowForKnownSafeCalls: [{ from: 'package', name: 'persistQueryClient', package: '@tanstack' }],
                    allowForKnownSafePromises: [],
                    checkThenables: true,
                    ignoreIIFE: true,
                    ignoreVoid: true,
                },
            ],
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: {
                        arguments: false,
                        attributes: false,
                    },
                },
            ],
            '@stylistic/jsx-closing-bracket-location': [
                'warn',
                {
                    nonEmpty: 'line-aligned',
                    selfClosing: 'line-aligned',
                },
            ],
            '@stylistic/jsx-curly-brace-presence': [
                'warn',
                {
                    props: 'never',
                    children: 'never',
                    propElementValues: 'always',
                },
            ],
            '@stylistic/jsx-curly-spacing': [
                2,
                {
                    when: 'never',
                    allowMultiline: false,
                },
            ],
            '@stylistic/jsx-max-props-per-line': [
                'error',
                {
                    maximum: 1,
                    when: 'always',
                },
            ],
            '@stylistic/jsx-newline': [
                'error',
                {
                    prevent: true,
                    allowMultilines: false,
                },
            ],
            '@stylistic/jsx-one-expression-per-line': ['warn', { allow: 'none' }],
            '@stylistic/jsx-pascal-case': [
                'error',
                {
                    allowAllCaps: false,
                    allowNamespace: false,
                    allowLeadingUnderscore: false,
                },
            ],
            '@stylistic/jsx-quotes': ['error', 'prefer-double'],
            '@stylistic/jsx-sort-props': [
                'error',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    shorthandLast: false,
                    multiline: 'last',
                    ignoreCase: false,
                    noSortAlphabetically: false,
                    reservedFirst: true,
                    locale: 'auto',
                },
            ],

            /**
             * @link https://github.com/jsx-eslint/eslint-plugin-react
             */
            ...reactPlugin.configs.flat.recommendeds,

            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',

            /**
             * @link https://www.npmjs.com/package/eslint-plugin-react-hooks
             */
            ...reactHooks.configs.recommended.rules,
        },
    },
];

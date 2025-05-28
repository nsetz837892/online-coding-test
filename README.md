# Online Coding Test

A simple personal expense tracker listing user expenses, entity paginated. Exposes a control for filtering expenses by
category and controls for paginating the listing.

The focus was on releasing an MVP that met the requirements. A base theme has been created, but no management of the
light or dark theme has been implemented.

## Tech Stack

The application API is a Laravel 12.x setup utilising Laravel Sanctum for SPA auth. The front end is a React 19.x,
TypeScript 5.x, Vite 6.x setup.

State management is with TanStack Query. Other possible options for state management include Zustand and Redux.

Routing is with TanStack Router file-based routing.

Styling is a default Tailwind/Flowbite theme, and a base set of components is provided with the Flowbite React package.

## Setup

Please see the accompanying document for a detailed setup.\

#### In short:

`git clone git@github.com:nsetz837892/online-coding-test.git`

`composer install`

`npm ci install`

`cp .env.example .env`

`php artisan key:generate`

`./vendor/bin/sail up -d`

`composer sail-migrate`

`composer sail-seed`

`npm run dev`

## API

The API exposes endpoints supporting application authentication, category listing, expense listing, expense summary,
expense creation, and user CRUD.

The API is gated by Laravel Sanctum for SPA.

The API utilises Spatie Laravel Permissions for access control.

The API utilises the Laravel QueryBuilder, and by extension PDO parameter binding, to protect the application against
SQL injection attacks.

The API utilises the Laravel CSRF protection to automatically handle the inclusion of the CSRF token when making
requests.

The API does not employ domain caching currently. However, a cache store, such as Redis, could be implemented.

### Endpoints

**GET** .......... /sanctum/csrf-cookie ..... Initialise CSRF protection for the application\
**POST** ........ /auth/login ..................... Authentication with credentials\
**GET** .......... /auth/logout .................... Session destroy\
**GET** .......... /api/category .................. Category domain listing\
**GET** .......... /api/expenses ................. Expense domain entity listing\
**POST** ........ /api/expenses ................ Expense domain entity create\
**DELETE** ... /api/expenses ................. Expense domain entity listing\
**GET** .......... /api/expense/summary ... Expense domain summary

## Tests

### UI

A boilerplate setup for Vitest and a simple test suite for the App component is created – as an example.

`npm run test`

### API

Feature tests on the User, Expense, and Category domains have been created.

`./vendor/bin/pest`

## Additional Features

Several features are omitted due to time constraints. The features include:

- Sort function on table column headers
- Filter on the date column
- Column for actions (edit | delete)
- Search by use

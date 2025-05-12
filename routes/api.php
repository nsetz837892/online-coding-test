<?php
declare(strict_types = 1);

use App\Http\Domain\Category\Models\Category;
use App\Http\Domain\Expense\Models\Expense;
use App\Http\Domain\User\Models\User;
use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | Info Route [public]
 |--------------------------------------------------------------------------
 */
/**
 * @uses \App\Http\Controllers\IndexController::show()
 */
Route::get('/', 'App\Http\Controllers\IndexController@show')
    ->name('info.index');

/*
 |--------------------------------------------------------------------------
 | Auth Routes [public]
 |--------------------------------------------------------------------------
 */
Route::name('auth.')
    ->prefix('auth')
    ->middleware('throttle:5,1')
    ->group(
        static function () {
            /**
             * Authenticate a user account with the API.
             *
             * @uses \App\Http\Controllers\Auth\AuthController::login()
             */
            Route::post('login', 'App\Http\Controllers\Auth\AuthController@login')->name('login');
        }
    );

/*
 |--------------------------------------------------------------------------
 | Sanctum Token Routes [public]
 |--------------------------------------------------------------------------
 */
/**
 * Authenticate a user account with the API using tokens.
 *
 * @uses \App\Http\Controllers\Auth\AuthController::token()
 */
Route::post('/sanctum/token', 'App\Http\Controllers\Auth\AuthController@token')->name('sanctum.token');

/*
 |--------------------------------------------------------------------------
 | ?API Routes
 |--------------------------------------------------------------------------
 */
Route::group(
    [
        'prefix'     => '',
        'as'         => 'api.',
        'middleware' => ['auth:sanctum'],
    ],
    static function () {
        /*
         |--------------------------------------------------------------------------
         | Logout Routes
         |--------------------------------------------------------------------------
         */
        /**
         * Destroy a users' session.
         *
         * @uses \App\Http\Controllers\Auth\AuthController::logout()
         */
        Route::get('logout', 'App\Http\Controllers\Auth\AuthController@logout')->name('logout');

        /*
         |--------------------------------------------------------------------------
         | Users Routes
         |--------------------------------------------------------------------------
         */
        Route::group(
            [
                'prefix' => 'users',
                'as'     => 'users.',
            ],
            static function () {
                /**
                 * Get a listing of User resource.
                 *
                 * @uses \App\Http\Controllers\User\UserController::index()
                 */
                Route::get('/', 'App\Http\Controllers\User\UserController@index')
                    ->can('all', [User::class])
                    ->name('index');

                /**
                 * Get a single User resource by unique key.
                 *
                 * @uses \App\Http\Controllers\User\UserController::show()
                 */
                Route::get('/{id}', 'App\Http\Controllers\User\UserController@show')
                    ->can('view', [User::class])
                    ->where('id', '[1-9]\d*') // Integer 1 or more
                    ->name('show');

                /**
                 * Create a single User resource.
                 *
                 * @uses \App\Http\Controllers\User\UserController::store()
                 */
                Route::post('/', 'App\Http\Controllers\User\UserController@store')
                    ->can('create', [User::class])
                    ->name('store');

                /**
                 * Update a single User resource.
                 *
                 * @uses \App\Http\Controllers\User\UserController::update()
                 */
                Route::patch('/{id}', 'App\Http\Controllers\User\UserController@update')
                    ->can('update', [User::class])
                    ->where('id', '[1-9]\d*')
                    ->name('update');

                /**
                 * Delete a single User resource.
                 *
                 * @uses \App\Http\Controllers\User\UserController::destroy()
                 */
                Route::delete('/{id}', 'App\Http\Controllers\User\UserController@destroy')
                    ->can('delete', User::class)
                    ->where('id', '[1-9]\d*')
                    ->name('destroy');
            }
        );

        /*
         |--------------------------------------------------------------------------
         | Expenses Routes
         |--------------------------------------------------------------------------
         */
        Route::group(
            [
                'prefix'     => 'expenses',
                'as'         => 'expenses.',
                'middleware' => ['auth:sanctum'],
            ],
            static function () {
                /**
                 * Get a listing of Expense resource.
                 *
                 * @uses \App\Http\Controllers\Expense\ExpenseController::index()
                 */
                Route::get('/', 'App\Http\Controllers\Expense\ExpenseController@index')
                    ->can('all', [Expense::class])
                    ->name('index');

                /**
                 * Store a newly created Expense resource in storage.
                 *
                 * @uses \App\Http\Controllers\Expense\ExpenseController::store()
                 */
                Route::post('/', 'App\Http\Controllers\Expense\ExpenseController@store')
                    ->name('store')
                    ->can('create', [Expense::class]);

                /**
                 * Delete an Expense resource in storage.
                 *
                 * @uses \App\Http\Controllers\Expense\ExpenseController::destroy()
                 */
                Route::delete('/{id}', 'App\Http\Controllers\Expense\ExpenseController@destroy')
                    ->name('destroy')
                    ->where('id', '[1-9]\d*')
                    ->can('delete', [Expense::class]);

                /**
                 * Get an expense summary for the given user unique key.
                 *
                 * @uses \App\Http\Controllers\Expense\ExpenseController::summary()
                 */
                Route::get('/summary', 'App\Http\Controllers\Expense\ExpenseController@summary')
                    ->name('summary')
                    ->can('summary', [Expense::class]);
            }
        );

        /*
         |--------------------------------------------------------------------------
         | Category Routes
         |--------------------------------------------------------------------------
         */
        Route::group(
            [
                'prefix'     => 'categories',
                'as'         => 'categories.',
                'middleware' => ['auth:sanctum'],
            ],
            static function () {
                /**
                 * Get a listing of Category resource.
                 *
                 * @uses \App\Http\Controllers\Category\CategoryController::index()
                 */
                Route::get('/', 'App\Http\Controllers\Category\CategoryController@index')
                    ->can('all', Category::class)
                    ->name('index');
            }
        );
    }
);
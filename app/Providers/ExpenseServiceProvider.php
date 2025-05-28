<?php

namespace App\Providers;
;
use App\Http\Domain\Expense\Repositories\Contracts\ExpenseRepositoryInterface;
use App\Http\Domain\Expense\Repositories\ExpenseRepository;
use App\Http\Domain\Expense\Services\Contracts\ExpenseServiceInterface;
use App\Http\Domain\Expense\Services\ExpenseService;
use Illuminate\Support\ServiceProvider;

class ExpenseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            ExpenseServiceInterface::class,
            ExpenseService::class
        );

        $this->app->bind(
            ExpenseRepositoryInterface::class,
            ExpenseRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

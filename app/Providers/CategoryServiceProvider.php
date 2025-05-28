<?php

namespace App\Providers;

use App\Http\Domain\Category\Repositories\CategoryRepository;
use App\Http\Domain\Category\Repositories\Contracts\CategoryRepositoryInterface;
use App\Http\Domain\Category\Services\CategoryService;
use App\Http\Domain\Category\Services\Contracts\CategoryServiceInterface;
use Illuminate\Support\ServiceProvider;

class CategoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            CategoryServiceInterface::class,
            CategoryService::class
        );

        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class
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

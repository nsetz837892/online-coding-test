<?php

namespace App\Providers;

use App\Http\Domain\User\Repositories\Contracts\UserRepositoryInterface;
use App\Http\Domain\User\Repositories\UserRepository;
use App\Http\Domain\User\Services\Contracts\UserServiceInterface;
use App\Http\Domain\User\Services\UserService;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            UserServiceInterface::class,
            UserService::class
        );

        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
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

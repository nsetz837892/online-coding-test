<?php

namespace App\Providers;

use App\Http\Domain\Country\Repositories\Contracts\CountryRepositoryInterface;
use App\Http\Domain\Country\Repositories\CountryRepository;
use App\Http\Domain\Country\Services\Contracts\CountryServiceInterface;
use App\Http\Domain\Country\Services\CountryService;
use Illuminate\Support\ServiceProvider;

/**
 * CountryServiceProvider
 */
class CountryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            CountryServiceInterface::class,
            CountryService::class
        );

        $this->app->bind(
            CountryRepositoryInterface::class,
            CountryRepository::class
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

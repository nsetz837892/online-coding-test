<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

/**
 * AppServiceProvider
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::guessPolicyNamesUsing(static function ($modelClass) {
            $baseModelClass = preg_replace('/s$/', '', class_basename($modelClass));
            return '\\App\\Http\\Domain\\' . $baseModelClass . '\\Policies\\' . $baseModelClass . 'Policy';
        });
    }
}

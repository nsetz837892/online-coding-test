<?php
declare(strict_types = 1);

namespace App\Providers;

use App\Http\Domain\Category\Models\Category;
use App\Http\Domain\Expense\Models\Expense;
use App\Http\Domain\Category\Policies\CategoryPolicy;
use App\Http\Domain\Expense\Policies\ExpensePolicy;
use App\Http\Domain\User\Models\User;
use App\Http\Domain\User\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

/**
 * AuthServiceProvider
 */
class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Category::class => CategoryPolicy::class,
        Expense::class  => ExpensePolicy::class,
        User::class     => UserPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
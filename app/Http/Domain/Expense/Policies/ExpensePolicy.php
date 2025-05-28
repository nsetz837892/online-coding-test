<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\Policies;

use App\Http\Domain\Expense\Models\Expense;
use App\Http\Domain\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * ExpensePolicy defines authorization logic
 * for Expense domain model or resource.
 */
class ExpensePolicy
{
    use HandlesAuthorization;

    public function all(User|null $user): bool
    {
        return $user !== null;
    }

    public function view(User|null $user, Expense $expense): bool
    {
        // guests cannot view expenses
        if ($user === null) {
            return false;
        }

        // users can view their own expenses
        return $user->getKey() === $expense->getAttribute('user_id');
    }

    public function create(User $user): bool
    {
        return $user->can('create expenses');
    }

    public function update(User $user, Expense $expense): bool
    {
        // admin can update all expenses
        if ($user->hasRole('admin')) {
            return true;
        }

        if (!$user->can('update expenses')) {
            return false;
        }

        // users can update their own expenses
        return $user->getKey() === $expense->getAttribute('user_id');
    }

    public function delete(User $user): bool
    {
        // admin can delete all expenses
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->can('delete expenses');
    }

    public function summary(User $user): bool
    {
        return $user->can('view expense summary');
    }
}
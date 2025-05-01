<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Policies;

use App\Http\Domain\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * UserPolicy defines authorization logic
 * for User model or resource.
 */
class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view all User resource.
     */
    public function all(User|null $user): bool
    {
        // guests cannot view expenses
        if ($user === null) {
            return false;
        }

        return $user->can('view users');
    }

    /**
     * Determine whether the user can view a User resource.
     */
    public function view(User|null $user): bool
    {
        // guests cannot view users
        if ($user === null) {
            return false;
        }

        return $user->can('view user');
    }

    /**
     * Determine if the given user can create users.
     */
    public function create(User $user): bool
    {
        return $user->can('create users');
    }

    /**
     * Determine if the given user can update users.
     */
    public function update(User $user): bool
    {
        return $user->can('update users');
    }

    /**
     * Determine if the given user can delete users.
     */
    public function delete(User $user): bool
    {
        return $user->can('delete users');
    }
}
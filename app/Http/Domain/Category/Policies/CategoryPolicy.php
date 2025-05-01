<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Policies;

use App\Http\Domain\User\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * CategoryPolicy defines authorization logic
 * for Category model or resource.
 */
class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any Category resource.
     *
     * Authenticated users view categories
     */
    public function all(User|null $user): bool
    {
        return $user !== null;
    }
}
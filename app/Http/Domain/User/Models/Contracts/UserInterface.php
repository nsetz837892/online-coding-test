<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Models\Contracts;

use App\Http\Domain\Country\Models\Country;
use App\Http\Domain\Role\DTO\RoleDTO;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * UserInterface exposes common methods.
 *
 * @package App\Http\Domain\User\Models\Contracts
 */
interface UserInterface
{
    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string;

    /**
     * Get the user's username.
     */
    public function username(): string;

    /**
     * Get the user's email.
     */
    public function email(): string;

    /**
     * Get the Expense resources owned by this User resource.
     */
    public function getExpenses(): Collection;

    /**
     * Get the Country resource owned by this User resource.
     */
    public function getCountry(): Country;

    /**
     * Get the Country model owned by this User resource.
     */
    public function getRole(): Model;

    /**
     * Get the Country resource owned by this User resource.
     */
    public function getRoleResource(): RoleDTO;
}
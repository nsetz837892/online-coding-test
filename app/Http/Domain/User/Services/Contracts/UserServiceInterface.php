<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Services\Contracts;

use App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface;
use App\Http\Domain\User\DTO\CreateUserDTO;
use App\Http\Domain\User\DTO\UpdateUserDTO;
use App\Http\Domain\User\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * UserService handles the business logic
 * for the User domain.
 *
 * @package App\Http\Domain\User\Services\Contracts
 */
interface UserServiceInterface
{
    /**
     * Create a new User resource.
     *
     * @param \App\Http\Domain\User\DTO\CreateUserDTO $dto
     *
     * @return \App\Http\Domain\User\Models\User|null
     */
    public function create(CreateUserDTO $dto): ?User;

    /**
     * Update a User resource  by unique key.
     *
     * @param int                                     $id
     * @param \App\Http\Domain\User\DTO\UpdateUserDTO $dto
     *
     * @return \App\Http\Domain\User\Models\User|null
     */
    public function update(int $id, UpdateUserDTO $dto): ?User;

    /**
     * Get a listing of User resource.
     *
     * @param \App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface $data
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Collection
     */
    public function findMany(PaginateDTOInterface $data): LengthAwarePaginator|Collection;

    /**
     * Get a single User resource by unique key.
     *
     * @param int $id
     *
     * @return \App\Http\Domain\User\Models\User|null
     */
    public function find(int $id): ?User;

    /**
     * Get a single User resource by username.
     *
     * @param string $username
     *
     * @return \App\Http\Domain\User\Models\User|null
     */
    public function findByUsername(string $username): ?User;

    /**
     * Delete a User resource by unique key.
     *
     * @param int $id
     *
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * exists validates a User resource exits by unique key.
     *
     * @param int $userId
     *
     * @return bool
     */
    public function exists(int $userId): bool;
}
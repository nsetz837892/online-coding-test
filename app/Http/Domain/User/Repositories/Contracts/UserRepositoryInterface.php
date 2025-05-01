<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Repositories\Contracts;

use App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface;
use App\Http\Domain\User\DTO\CreateUserDTO;
use App\Http\Domain\User\DTO\UpdateUserDTO;
use App\Http\Domain\User\DTO\UserPaginateDTO;
use App\Http\Domain\User\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * UserRepository handles fetching and persisting
 * the domain object User.
 *
 * @package App\Http\Domain\User\Repositories\Contracts
 */
interface UserRepositoryInterface
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
     * Update a User resource by unique key.
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
     * @param \App\Http\Domain\User\DTO\UserPaginateDTO $data
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findAll(UserPaginateDTO $data): Collection;

    /**
     * Find a single User resource by unique key.
     *
     * @param int $id
     *
     * @return \App\Http\Domain\User\Models\User|null
     */
    public function findOne(int $id): ?User;

    /**
     * Get a listing of User resource.
     *
     * @param \App\Http\Domain\User\DTO\UserPaginateDTO $data
     *
     * @return LengthAwarePaginator
     */
    public function paginate(PaginateDTOInterface $data): LengthAwarePaginator;

    /**
     * Delete a single User resource.
     *
     * @param int $id
     *
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * exists validates a User resource exists by unique key.
     *
     * @param int $id
     *
     * @return bool
     */
    public function exists(int $id): bool;
}
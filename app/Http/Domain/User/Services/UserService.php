<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Services;

use App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface;
use App\Http\Domain\User\DTO\CreateUserDTO;
use App\Http\Domain\User\DTO\UpdateUserDTO;
use App\Http\Domain\User\Models\User;
use App\Http\Domain\User\Repositories\Contracts\UserRepositoryInterface;
use App\Http\Domain\User\Services\Contracts\UserServiceInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * UserService handles the business logic
 * for the User domain.
 *
 * @package App\Http\Domain\User\Services
 */
class UserService implements UserServiceInterface
{
    /**
     * @param \App\Http\Domain\User\Repositories\Contracts\UserRepositoryInterface $repository
     */
    public function __construct(protected UserRepositoryInterface $repository)
    {
    }

    /**
     * @inheritDoc
     */
    public function findMany(PaginateDTOInterface $data): LengthAwarePaginator|Collection
    {
        if ($data->paginate) {
            return $this->repository->paginate($data);
        }

        return $this->repository->findAll($data);
    }

    /**
     * @inheritDoc
     */
    public function find(int $id): ?User
    {
        return $this->repository->findOne($id);
    }

    /**
     * @inheritDoc
     */
    public function create(CreateUserDTO $dto): ?User
    {
        return $this->repository->create($dto);
    }

    /**
     * @inheritDoc
     */
    public function update(int $id, UpdateUserDTO $dto): ?User
    {
        return $this->repository->update($id, $dto);
    }

    /**
     * @inheritDoc
     */
    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    /**
     * @inheritDoc
     */
    public function exists(int $userId): bool
    {
        return $this->repository->exists($userId);
    }

    /**
     * @inheritDoc
     */
    public function findByUsername(string $username): ?User
    {
        return User::query()->where('username', '=', $username)->first();
    }
}
<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Repositories;

use App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface;
use App\Http\Domain\User\DTO\CreateUserDTO;
use App\Http\Domain\User\DTO\UpdateUserDTO;
use App\Http\Domain\User\Models\User;
use App\Http\Domain\User\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Role;

/**
 * UserRepository handles fetching and persisting
 * the domain object User.
 *
 * @package App\Http\Domain\User\Repositories
 */
class UserRepository implements UserRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function exists(int $id): bool
    {
        return User::where('id', $id)->exists();
    }

    /**
     * @inheritDoc
     */
    public function create(CreateUserDTO $dto): ?User
    {
        $data = $dto->toArray();

        $role = Role::find($data['roleId']);

        if (!$role) {
            return null;
        }

        $user = User::create($data);

        if (!$user) {
            return null;
        }

        $user->assignRole($role->name);

        return $user;
    }

    /**
     * @inheritDoc
     */
    public function update(int $id, UpdateUserDTO $dto): ?User
    {
        $data = array_filter($dto->toArray());

        $roleId = $data['roleId'] ?? null;

        unset($data['roleId']);

        $user = User::find($id);

        if (!$user) {
            return null;
        }

        $user->update($data);

        if ($roleId) {
            $role = Role::find($roleId);

            if ($role) {
                $user->assignRole($role->name);
            }
        }

        return $user;
    }

    /**
     * @inheritDoc
     */
    public function findAll(PaginateDTOInterface $data): Collection
    {
        return User::query()
            ->orderBy('id')
            ->get();
    }

    /**
     * @inheritDoc
     */
    public function findOne(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * @inheritDoc
     */
    public function paginate(PaginateDTOInterface $data): LengthAwarePaginator
    {
        return User::query()
            ->orderBy('id')
            ->paginate($data->perPage)
            ->withQueryString();
    }

    /**
     * @inheritDoc
     */
    public function delete(int $id): bool
    {
        return User::destroy($id) === 1;
    }
}
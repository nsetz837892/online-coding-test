<?php
declare(strict_types = 1);

namespace App\Http\Domain\Auth\DTO;

use App\Contracts\ToObject;
use App\Http\Domain\Role\DTO\RoleDTO;
use App\Http\Domain\User\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Support\Arrayable;

/**
 * AuthResource is a DTO for authentication resource.
 *
 * Exposes a factory method for convenient
 * instantiation - accepting a user resource in
 * method arguments.
 *
 * @package App\Http\Domain\Auth\DTO
 */
class AuthResource implements Arrayable, ToObject
{
    /**
     * @param int     $id
     * @param string  $name
     * @param string  $email
     * @param RoleDTO $role
     */
    public function __construct(public int $id, public string $name, public string $email, public RoleDTO $role)
    {
    }

    /**
     * fromUser is a factory method - that instantiates
     * an instance of AuthResource by a User resource.
     *
     * @param \App\Http\Domain\User\Models\User|\Illuminate\Contracts\Auth\Authenticatable $user
     *
     * @return \App\Http\Domain\Auth\DTO\AuthResource
     */
    public static function fromUser(User|Authenticatable $user): AuthResource
    {
        return new self($user->getKey(), $user->username(), $user->email(), $user->getRoleResource());
    }

    /**
     * @inheritdoc
     * @return array
     */
    public function toArray(): array
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'email' => $this->email,
            'role'  => $this->role->toArray(),
        ];
    }

    /**
     * @inheritdoc
     * @return object
     */
    public function toObject(): object
    {
        return (object) $this->toArray();
    }
}
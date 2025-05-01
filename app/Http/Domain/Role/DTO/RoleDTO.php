<?php
declare(strict_types = 1);

namespace App\Http\Domain\Role\DTO;

use Illuminate\Database\Eloquent\Model;
use Spatie\LaravelData\Data;

/**
 * RoleDTO is a data model for the Role domain model.
 *
 * @package App\Http\Domain\Role\DTO
 */
class RoleDTO extends Data
{
    /**
     * @param int    $id
     * @param string $name
     * @param array  $permissions
     */
    public function __construct(public int $id, public string $name, public array $permissions)
    {
    }

    /**
     * Factory method to instantiate an instance
     * of RoleDTO from a Role domain model.
     *
     * @param \Spatie\Permission\Models\Role $role
     *
     * @return \App\Http\Domain\Role\DTO\RoleDTO
     */
    public static function fromRole(Model $role): RoleDTO
    {
        return new RoleDTO(
            $role->getKey(),
            $role->getAttribute('name'),
            $role->getPermissionNames()->toArray(),
        );
    }
}
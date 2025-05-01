<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

/**
 * Spatie roles and permissions seeder.
 */
class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view user',
            'create users',
            'update users',
            'delete users',
            'view users',
            'view expenses',
            'create expenses',
            'update expenses',
            'delete expenses',
            'view expense summary',
            'view categories',
            'update categories',
            'create categories',
            'delete categories',
        ];

        // create permissions
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // update cache to know about the newly created permissions (required if using WithoutModelEvents in seeders)
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create roles and assign created permissions

        // this can be done as separate statements
        Role::create(['name' => 'user'])
            ->givePermissionTo([
                                   'view categories',
                                   'view expenses',
                                   'create expenses',
                                   'update expenses',
                                   'delete expenses',
                                   'view expense summary',
                               ]);

        // or may be done by chaining
        Role::create(['name' => 'moderator'])
            ->givePermissionTo([
                                   'view user',
                                   'view users',
                                   'view categories',
                                   'update categories',
                                   'view expenses',
                                   'create expenses',
                                   'update expenses',
                                   'delete expenses',
                                   'view expense summary',
                               ]);

        Role::create(['name' => 'admin'])->givePermissionTo(Permission::all());
    }
}
<?php

namespace Database\Seeders;

use App\Http\Domain\Category\Models\Category;
use App\Http\Domain\Country\Models\Country;
use App\Http\Domain\Expense\Models\Expense;
use App\Http\Domain\User\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

/**
 * TestDatabaseSeeder
 */
class TestDatabaseSeeder extends Seeder
{
    public const ADMIN_USER = [
        'name'              => 'Admin',
        'surname'           => 'Tester',
        'email'             => 'admin@tester.com',
        'phone'             => '077998877661',
        'username'          => 'atester',
        'password'          => 'Passw0rd!',
        'email_verified_at' => '',
        'remember_token'    => '',
        'country_id'        => 1,
        'gender'            => 'm',
    ];

    public const USER = [
        'name'              => 'User',
        'surname'           => 'Tester',
        'email'             => 'user@tester.com',
        'phone'             => '077998877661',
        'username'          => 'utester',
        'password'          => 'T3st!nG',
        'email_verified_at' => '',
        'remember_token'    => '',
        'country_id'        => 2,
        'gender'            => 'f',
    ];

    private const COUNTRIES = [
        'gb' => 'Great Britain',
        'fr' => 'France',
        'de' => 'Germany',
        'it' => 'Italy',
        'be' => 'Belgium',
        'es' => 'Spain',
        'ca' => 'Canada',
        'us' => 'United States',
    ];

    private const PERMISSIONS = [
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

    private const CATEGORIES = [
        'Leisure',
        'Advertising',
        'Insurance',
        'Utilities',
        'Software',
        'Travel',
        'Marketing',
        'Equipment',
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach (self::COUNTRIES as $code => $name) {
            Country::factory(1)->create(['name' => $name, 'alpha_2_code' => $code]);
        }

        foreach (self::PERMISSIONS as $permission) {
            Permission::create(['name' => $permission]);
        }

        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Role::create(['name' => 'user'])
            ->givePermissionTo([
                                   'view categories',
                                   'view expenses',
                                   'create expenses',
                                   'update expenses',
                                   'delete expenses',
                                   'view expense summary',
                               ]);

        Role::create(['name' => 'admin'])->givePermissionTo(Permission::all());

        $adminUser = User::create([
                                      ...self::ADMIN_USER,
                                      'password'          => Hash::make(self::ADMIN_USER['password']),
                                      'email_verified_at' => now(),
                                      'remember_token'    => Str::random(10),
                                  ]);

        $adminUser->assignRole('admin');

        $user = User::create([
                                 ...self::USER,
                                 'password'          => Hash::make(self::USER['password']),
                                 'email_verified_at' => now(),
                                 'remember_token'    => Str::random(10),
                             ]);

        $user->assignRole('user');

        User::factory(49)->create()->each(function ($user) {
            $user->assignRole('user');
        });

        foreach (self::CATEGORIES as $category) {
            Category::create(['name' => $category]);
        }

        Expense::factory(100)->create();
    }
}

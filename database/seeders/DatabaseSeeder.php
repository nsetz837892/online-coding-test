<?php

namespace Database\Seeders;

use App\Http\Domain\User\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(
            [
                RolesAndPermissionsSeeder::class,
                CountriesSeeder::class,
            ]
        );

        $adminUser = User::create([
                                      'name'              => 'Admin',
                                      'surname'           => 'Acme',
                                      'email'             => 'admin@acme.com',
                                      'phone'             => '077123498765',
                                      'username'          => 'admin',
                                      'password'          => Hash::make('Passw0rd'),
                                      'email_verified_at' => now(),
                                      'remember_token'    => Str::random(10),
                                      'country_id'        => 1,
                                      'gender'            => 'm',
                                  ]);

        $adminUser->assignRole('admin');

        User::factory(50)->create()->each(function ($user) {
            $user->assignRole('user');
        });

        $this->call(
            [
                CategoriesSeeder::class,
                ExpensesSeeder::class,
            ]
        );
    }
}

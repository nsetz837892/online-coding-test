<?php

namespace Database\Factories;

use App\Http\Domain\User\Models\User;
use Database\Seeders\CountriesSeeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Http\Domain\User\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = User::class;

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws \Random\RandomException
     */
    public function definition(): array
    {
        $gender = random_int(0, 1);

        return [
            'name'              => $gender === 1 ? fake()->firstNameMale() : fake()->firstNameFemale(),
            'surname'           => fake()->lastName(),
            'email'             => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'phone'             => fake()->phoneNumber(),
            'username'          => fake()->unique()->userName(),
            'password'          => static::$password ??= Hash::make('password'),
            'remember_token'    => Str::random(10),
            'country_id'        => fake()->numberBetween(1, count(CountriesSeeder::COUNTRIES)),
            'gender'            => $gender === 1 ? 'm' : 'f',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

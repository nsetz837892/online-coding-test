<?php

namespace Database\Factories;

use App\Http\Domain\Expense\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Http\Domain\Expense\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Expense::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'     => fake()->numberBetween(1, 51),
            'description' => fake()->text(),
            'amount'      => fake()->randomFloat(2, 0.1, 999999.99),
            'category_id' => fake()->numberBetween(1, 5),
            'date'        => fake()->dateTimeThisYear()->format('Y-m-d H:i:s'),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Http\Domain\Category\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Http\Domain\Category\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique(true)->randomElement([
                                                              'Leisure',
                                                              'Advertising',
                                                              'Bank Fees',
                                                              'Insurance',
                                                              'Utilities',
                                                              'Rent',
                                                              'Software',
                                                              'Salaries and Wages',
                                                              'Education',
                                                              'Donations',
                                                              'Travel',
                                                              'Marketing',
                                                              'Subscriptions',
                                                              'Equipment',
                                                              'Property',
                                                              'Professional Services',
                                                              'Charitable Contributions',
                                                              'Office Supplies',
                                                          ]),
        ];
    }
}

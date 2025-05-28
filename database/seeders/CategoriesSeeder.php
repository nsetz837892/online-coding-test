<?php

namespace Database\Seeders;

use App\Http\Domain\Category\Models\Category;
use Illuminate\Database\Seeder;

/**
 * CategoriesSeeder
 */
class CategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
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
        ];

        foreach ($categories as $category) {
            Category::factory(1)->create(['name' => $category]);
        }
    }
}
<?php

namespace Database\Seeders;

use App\Http\Domain\Expense\Models\Expense;
use Illuminate\Database\Seeder;

/**
 * ExpensesSeeder
 */
class ExpensesSeeder extends Seeder
{
    public function run(): void
    {
        Expense::factory(500)->create();
    }
}
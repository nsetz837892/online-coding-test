<?php

namespace Database\Seeders;

use App\Http\Domain\Country\Models\Country;
use Illuminate\Database\Seeder;

/**
 * ExpensesSeeder
 */
class CountriesSeeder extends Seeder
{
    public const COUNTRIES = [
        'gb' => 'Great Britain',
        'fr' => 'France',
        'de' => 'Germany',
        'it' => 'Italy',
        'be' => 'Belgium',
        'es' => 'Spain',
        'ua' => 'Ukraine',
        'ca' => 'Canada',
        'us' => 'United States',
        'dk' => 'Denmark',
        'gl' => 'Greenland',
        'is' => 'Iceland',
        'nz' => 'New Zealand',
        'pt' => 'Portugal',
        'za' => 'South Africa',
    ];

    public function run(): void
    {
        foreach (self::COUNTRIES as $code => $name) {
            Country::factory(1)->create(['name' => $name, 'alpha_2_code' => $code]);
        }
    }
}
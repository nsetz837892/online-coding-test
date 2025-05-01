<?php
declare(strict_types = 1);

namespace App\Http\Domain\Country\Repositories;

use App\Http\Domain\Country\Models\Country;
use App\Http\Domain\Country\Repositories\Contracts\CountryRepositoryInterface;

/**
 * CountryRepository handles fetching and persisting
 * the domain object Country.
 *
 * @package App\Http\Domain\Country\Repositories
 */
class CountryRepository implements CountryRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function exists(int $id): bool
    {
        return Country::where('id', '=', $id)->exists();
    }
}
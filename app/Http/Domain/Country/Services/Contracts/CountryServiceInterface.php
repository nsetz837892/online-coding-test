<?php
declare(strict_types = 1);

namespace App\Http\Domain\Country\Services\Contracts;

/**
 * @package App\Http\Domain\Country\Services\Contracts
 */
interface CountryServiceInterface
{
    /**
     * Validates a Category resource exits by unique key.
     *
     * @param int $countryId
     *
     * @return bool
     */
    public function exists(int $countryId): bool;
}
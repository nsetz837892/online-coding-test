<?php
declare(strict_types = 1);

namespace App\Http\Domain\Country\Repositories\Contracts;

/**
 * @package App\Http\Domain\Country\Repositories\Contracts
 */
interface CountryRepositoryInterface
{
    /**
     * exists validates a Country resource exists by unique key.
     *
     * @param int $id
     *
     * @return bool
     */
    public function exists(int $id): bool;
}
<?php
declare(strict_types = 1);

namespace App\Http\Domain\Country\Services;

use App\Http\Domain\Country\Repositories\Contracts\CountryRepositoryInterface;
use App\Http\Domain\Country\Services\Contracts\CountryServiceInterface;

/**
 * CountryService handles the business logic
 * for the Country domain.
 *
 * @package App\Http\Domain\Country\Services
 */
class CountryService implements CountryServiceInterface
{
    public function __construct(protected CountryRepositoryInterface $repository)
    {
    }

    /**
     * @inheritDoc
     */
    public function exists(int $countryId): bool
    {
        return $this->repository->exists($countryId);
    }
}
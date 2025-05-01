<?php
declare(strict_types = 1);

namespace App\Http\Domain\Country\Rules;

use App\Http\Domain\Country\Services\Contracts\CountryServiceInterface;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * CountryExists validates a Country resource
 * exists by unique key.
 */
readonly class CountryExists implements ValidationRule
{
    /**
     * @param \App\Http\Domain\Country\Services\Contracts\CountryServiceInterface $service
     */
    public function __construct(private CountryServiceInterface $service)
    {
    }

    /**
     * Run the validation rule.
     *
     * @param \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_numeric($value)) {
            $fail('The :attribute must be numeric.');
        }

        if (!$this->service->exists((int) $value)) {
            $fail('The :attribute does not exists in storage.');
        }
    }
}

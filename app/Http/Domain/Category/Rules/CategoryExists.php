<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Rules;

use App\Http\Domain\Category\Services\Contracts\CategoryServiceInterface;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * CategoryExists validates a Category resource
 * exists by unique key.
 */
readonly class CategoryExists implements ValidationRule
{
    /**
     * @param \App\Http\Domain\Category\Services\Contracts\CategoryServiceInterface $service
     */
    public function __construct(private CategoryServiceInterface $service)
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

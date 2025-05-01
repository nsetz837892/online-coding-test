<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Rules;

use App\Http\Domain\User\Services\Contracts\UserServiceInterface;
use Illuminate\Contracts\Validation\ValidationRule;
use Closure;

/**
 * UserExists validates a User resource
 * exists by unique key.
 */
readonly class UserExists implements ValidationRule
{
    /**
     * @param \App\Http\Domain\User\Services\Contracts\UserServiceInterface $service
     */
    public function __construct(private UserServiceInterface $service)
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

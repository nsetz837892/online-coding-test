<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\DTO;

use App\Http\Domain\Country\Rules\CountryExists;
use illuminate\Http;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;

/**
 * UpdateUserDTO is a data object used in updating
 * a User resource.
 *
 * @package App\Http\Domain\User\DTO
 */
class UpdateUserDTO extends Data
{
    public function __construct(
        public ?string $name,
        public ?string $surname,
        public ?string $email,
        public ?string $phone,
        public ?string $username,
        public ?string $password,
        public ?string $gender,
        #[MapOutputName('country_id')]
        public ?int    $countryId,
        public ?int    $roleId,
    ) {
    }

    public static function rules(): array
    {
        return [
            'name'      => ['nullable', 'string', 'min:1', 'max:100'],
            'surname'   => ['nullable', 'string', 'min:1', 'max:100'],
            'email'     => ['nullable', 'email'],
            'phone'     => ['nullable', 'string', 'between:4,100'],
            'username'  => ['nullable', 'min:1', 'max:100'],
            'password'  => ['nullable', 'string', 'between:3,100', 'confirmed'],
            'gender'    => ['nullable', Rule::in(['m', 'f']),],
            'countryId' => ['nullable', 'numeric', 'integer', 'min:1', app(CountryExists::class)],
            'roleId'    => ['nullable', 'numeric', 'integer', 'min:1', 'exists:roles,id'],
        ];
    }

    /**
     * Factory method - instantiate a new instance CreateExpenseDTO -
     * parsing requests attributes.
     *
     * @param \illuminate\Http\Request $request
     *
     * @return \App\Http\Domain\User\DTO\UpdateUserDTO
     */
    public static function fromRequest(Http\Request $request): UpdateUserDTO
    {
        $data = $request->validate(self::rules());

        return new self(
            $data['name'] ?? null,
            $data['surname'] ?? null,
            $data['email'] ?? null,
            $data['phone'] ?? null,
            $data['username'] ?? null,
            $data['password'] ?? null,
            $data['gender'] ?? null,
            isset($data['countryId']) ? (int) $data['countryId'] : null,
            isset($data['roleId']) ? (int) $data['countryId'] : null,
        );
    }
}
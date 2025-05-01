<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\DTO;

use App\Http\Domain\Country\Rules\CountryExists;
use illuminate\Http;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Data;

/**
 * CreateUserDTO is a data object used in the creation
 * of a User resource.
 *
 * @package App\Http\Domain\User\DTO
 */
class CreateUserDTO extends Data
{
    public function __construct(
        public string $name,
        public string $surname,
        public string $email,
        public string $phone,
        public string $username,
        public string $password,
        public string $gender,
        #[MapOutputName('country_id')]
        public int    $countryId,
        public int    $roleId,
    ) {
    }

    public static function rules(): array
    {
        return [
            'name'      => ['required', 'string', 'min:1', 'max:100'],
            'surname'   => ['required', 'string', 'min:1', 'max:100'],
            'email'     => ['required', 'email'],
            'phone'     => ['required', 'string', 'between:4,100'],
            'username'  => ['required', 'min:1', 'max:100'],
            'password'  => ['required', 'string', 'between:3,100', 'confirmed'],
            'gender'    => ['required', Rule::in(['m', 'f']),],
            'countryId' => ['required', 'numeric', 'integer', 'min:1', app(CountryExists::class)],
            'roleId'    => ['required', 'numeric', 'integer', 'min:1', 'exists:roles,id'],
        ];
    }

    /**
     * Factory method - instantiate a new instance CreateExpenseDTO -
     * parsing requests attributes.
     *
     * @param \illuminate\Http\Request $request
     *
     * @return \App\Http\Domain\User\DTO\CreateUserDTO
     */
    public static function fromRequest(Http\Request $request): CreateUserDTO
    {
        $data = $request->validate(self::rules());

        return new self(
            $data['name'],
            $data['surname'],
            $data['email'],
            $data['phone'],
            $data['username'],
            $data['password'],
            $data['gender'],
            (int) $data['countryId'],
            (int) $data['roleId'],
        );
    }
}
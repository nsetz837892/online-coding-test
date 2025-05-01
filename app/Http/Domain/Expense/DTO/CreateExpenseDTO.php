<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\DTO;

use App\Http\Domain\Category\Rules\CategoryExists;
use App\Http\Domain\User\Rules\UserExists;
use Carbon\Carbon;
use illuminate\Http;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\MapOutputName;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;

/**
 * CreateExpenseDTO is a data object used in the creation
 * of an Expense resource.
 *
 * @package App\Http\Domain\Expense\DTO
 */
class CreateExpenseDTO extends Data
{
    public function __construct(
        #[MapOutputName('user_id')]
        public int     $userId,
        public float   $amount,
        #[MapOutputName('category_id')]
        public int     $categoryId,
        #[WithTransformer(DateTimeInterfaceTransformer::class)]
        public Carbon  $date,
        public ?string $description = null,
    ) {
    }

    public static function rules(): array
    {
        return [
            'userId'      => ['required', 'numeric', 'integer', 'min:1', app(UserExists::class)],
            'categoryId'  => ['required', 'numeric', 'integer', 'min:1', app(CategoryExists::class)],
            'amount'      => 'required|numeric|decimal:0,2',
            'date'        => ['required', Rule::date()->format('Y-m-d H:i:s'),],
            'description' => 'nullable|string|min:1',
        ];
    }

    /**
     * Factory method - instantiate a new instance CreateExpenseDTO -
     * parsing requests attributes.
     *
     * @param \illuminate\Http\Request $request
     *
     * @return \App\Http\Domain\Expense\DTO\CreateExpenseDTO
     */
    public static function fromRequest(Http\Request $request): CreateExpenseDTO
    {
        $data = $request->validate(self::rules());

        return new self(
            (int) $data['userId'],
            (float) $data['amount'],
            (int) $data['categoryId'],
            Carbon::parse($data['date']),
            $data['description'],
        );
    }
}
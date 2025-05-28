<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\DTO;

use App\Http\Domain\Category\Rules\CategoryExists;
use App\Http\Domain\User\Rules\UserExists;
use illuminate\Http;
use Spatie\LaravelData\Data;

/**
 * ExpensePaginateDTO parses a request query string.
 *
 * @package App\Http\Domain\Expense\DTO
 */
class ExpensePaginateDTO extends Data
{
    /** @var int Default Per page value */
    public const PER_PAGE = 15;

    /**
     * @param bool        $paginate
     * @param int         $page
     * @param int         $perPage
     * @param int|null    $userId
     * @param int|null    $categoryId
     * @param string|null $term
     */
    public function __construct(
        public bool    $paginate,
        public int     $page,
        public int     $perPage,
        public ?int    $userId,
        public ?int    $categoryId,
        public ?string $term,
    ) {
    }

    public static function rules(): array
    {
        return [
            'userId'     => ['nullable', 'numeric', 'integer', 'min:1', app(UserExists::class)],
            'categoryId' => ['nullable', 'numeric', 'integer', 'min:1', app(CategoryExists::class)],
            'paginate'   => 'nullable|numeric|integer|min:0|max:1',
            'page'       => 'nullable|numeric|integer|min:1',
            'perPage'    => 'nullable|numeric|integer|min:1',
            'term'       => 'nullable|string|min:1',
        ];
    }

    /**
     * Factory method - instantiate a new instance ExpensePaginateDTO -
     * parsing requests attributes.
     *
     * @param \illuminate\Http\Request $request
     *
     * @return \App\Http\Domain\Expense\DTO\ExpensePaginateDTO
     */
    public static function fromRequest(Http\Request $request): ExpensePaginateDTO
    {
        $data = $request->validate(self::rules());

        return new self(
            isset($data['paginate']) && (int) $data['paginate'] === 1,
            (int) ($data['page'] ?? '1'),
            isset($data['perPage']) ? (int) $data['perPage'] : self::PER_PAGE,
            isset($data['userId']) ? (int) $data['userId'] : null,
            isset($data['categoryId']) ? (int) $data['categoryId'] : null,
            $data['term'] ?? null,
        );
    }
}
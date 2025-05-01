<?php
declare(strict_types = 1);

namespace App\Http\Domain\Shared\DTO;

use App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface;
use illuminate\Http;
use Spatie\LaravelData\Data;

/**
 * UserPaginateDTO parses a request query string.
 *
 * @package App\Http\Domain\Shared\DTO
 */
class PaginateDTO extends Data implements PaginateDTOInterface
{
    /** @var int Default Per page value */
    public const PER_PAGE = 15;

    /**
     * @param bool $paginate
     * @param int  $page
     * @param int  $perPage
     */
    public function __construct(
        public bool $paginate,
        public int  $page,
        public int  $perPage,
    ) {
    }

    public static function rules(): array
    {
        return [
            'paginate' => 'nullable|numeric|integer|min:0|max:1',
            'page'     => 'nullable|numeric|integer|min:1',
            'perPage'  => 'nullable|numeric|integer|min:1',
        ];
    }

    /**
     * Factory method - instantiate a new instance CategoryPaginateDTO -
     * parsing requests attributes.
     *
     * @param \illuminate\Http\Request $request
     *
     * @return \App\Http\Domain\Shared\DTO\PaginateDTO
     */
    public static function fromRequest(Http\Request $request): PaginateDTOInterface
    {
        $data = $request->validate(self::rules());

        return new self(
            isset($data['paginate']) && (int) $data['paginate'] === 1,
            (int) ($data['page'] ?? '1'),
            isset($data['perPage']) ? (int) $data['perPage'] : self::PER_PAGE,

        );
    }
}
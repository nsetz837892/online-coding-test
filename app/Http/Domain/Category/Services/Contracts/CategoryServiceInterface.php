<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Services\Contracts;

use App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * CategoryService handles the business logic
 * for the Category domain.
 *
 * @package App\Http\Domain\Category\Services\Contracts
 */
interface CategoryServiceInterface
{
    /**
     * Get a listing of Expense resource.
     *
     * @param \App\Http\Domain\Category\DTO\CategoryPaginateDTO $data
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Collection
     */
    public function findMany(PaginateDTOInterface $data): LengthAwarePaginator|Collection;

    /**
     * Validates a Category resource exits by unique key.
     *
     * @param int $categoryId
     *
     * @return bool
     */
    public function exists(int $categoryId): bool;
}
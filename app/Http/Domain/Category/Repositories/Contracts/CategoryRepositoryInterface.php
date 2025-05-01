<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Repositories\Contracts;

use App\Http\Domain\Category\DTO\CategoryPaginateDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * @package App\Http\Domain\Category\Repositories\Contracts
 */
interface CategoryRepositoryInterface
{
    /**
     * Get a listing of Category resource.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findAll(): Collection;

    /**
     * Get a listing of Expense resource.
     *
     * @param \App\Http\Domain\Category\DTO\CategoryPaginateDTO $data
     *
     * @return LengthAwarePaginator
     */
    public function paginate(CategoryPaginateDTO $data): LengthAwarePaginator;

    /**
     * Find a Category resource by unique key.
     *
     * @param int $id
     *
     * @return bool
     */
    public function exists(int $id): bool;
}
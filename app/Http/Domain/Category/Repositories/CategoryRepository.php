<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Repositories;

use App\Http\Domain\Category\Models\Category;
use App\Http\Domain\Category\Repositories\Contracts\CategoryRepositoryInterface;
use App\Http\Domain\Category\DTO\CategoryPaginateDTO;
use App\Http\Domain\Expense\Models\Expense;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * CategoryRepository handles fetching and persisting
 * the domain object Category.
 *
 * @package App\Http\Domain\Category\Repositories
 */
class CategoryRepository implements CategoryRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function findAll(): Collection
    {
        return Category::all();
    }

    /**
     * @inheritDoc
     */
    public function paginate(CategoryPaginateDTO $data): LengthAwarePaginator
    {
        return Expense::latest()
            ->paginate($data->perPage)
            ->onEachSide(2)
            ->withQueryString();
    }

    /**
     * @inheritDoc
     */
    public function exists(int $id): bool
    {
        return Category::where('id', '=', $id)->exists();
    }
}
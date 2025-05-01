<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Services;

use App\Http\Domain\Category\Repositories\Contracts\CategoryRepositoryInterface;
use App\Http\Domain\Category\Services\Contracts\CategoryServiceInterface;
use App\Http\Domain\Shared\DTO\Contracts\PaginateDTOInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * CategoryService handles the business logic
 * for the Category domain.
 *
 * @package App\Http\Domain\Category\Services
 */
class CategoryService implements CategoryServiceInterface
{
    public function __construct(protected CategoryRepositoryInterface $repository)
    {
    }

    /**
     * @inheritDoc
     */
    public function exists(int $categoryId): bool
    {
        return $this->repository->exists($categoryId);
    }

    /**
     * @inheritDoc
     */
    public function findMany(PaginateDTOInterface $data): LengthAwarePaginator|Collection
    {
        if ($data->paginate) {
            return $this->repository->paginate($data);
        }

        return $this->repository->findAll();
    }
}
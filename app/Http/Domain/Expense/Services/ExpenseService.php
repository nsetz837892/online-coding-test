<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\Services;

use App\Http\Domain\Expense\DTO\CreateExpenseDTO;
use App\Http\Domain\Expense\DTO\ExpensePaginateDTO;
use App\Http\Domain\Expense\Models\Expense;
use App\Http\Domain\Expense\Repositories\Contracts\ExpenseRepositoryInterface;
use App\Http\Domain\Expense\Services\Contracts\ExpenseServiceInterface;
use App\Http\Domain\Expense\DTO\ExpenseSummaryDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * ExpenseServiceInterface handles the business logic
 * for the Expense domain.
 *
 * @package App\Http\Domain\Expense\Services
 */
class ExpenseService implements ExpenseServiceInterface
{
    public function __construct(
        protected ExpenseRepositoryInterface $repository
    ) {
    }

    /**
     * Create a new Expense resource.
     *
     * @param \App\Http\Domain\Expense\DTO\CreateExpenseDTO $dto
     *
     * @return \App\Http\Domain\Expense\Models\Expense|null
     */
    public function create(CreateExpenseDTO $dto): ?Expense
    {
        return $this->repository->create($dto);
    }

    /**
     * Paginated Expense resource list.
     *
     * @param \App\Http\Domain\Expense\DTO\ExpensePaginateDTO $data
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Collection
     */
    public function findMany(ExpensePaginateDTO $data): LengthAwarePaginator|Collection
    {
        if ($data->paginate) {
            return $this->repository->paginate($data);
        }

        return $this->repository->findAll($data);
    }

    /**
     * @inheritDoc
     */
    public function summary(int $userId): ExpenseSummaryDTO
    {
        return ExpenseSummaryDTO::fromCollection($this->repository->summary($userId));
    }

    /**
     * @inheritDoc
     */
    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }
}
<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\Repositories;

use App\Http\Domain\Expense\DTO\CreateExpenseDTO;
use App\Http\Domain\Expense\DTO\ExpensePaginateDTO;
use App\Http\Domain\Expense\Models\Expense;
use App\Http\Domain\Expense\Repositories\Contracts\ExpenseRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

/**
 * ExpenseRepository handles fetching and persisting
 * the domain object Expense.
 *
 * @package App\Http\Domain\Expense\Repositories
 */
class ExpenseRepository implements ExpenseRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function create(CreateExpenseDTO $dto): ?Expense
    {
        return Expense::create($dto->toArray());
    }

    /**
     * @inheritDoc
     */
    public function findAll(ExpensePaginateDTO $data): Collection
    {
        return Expense::query()
            ->when(!empty($data->userId), function (Builder $query) use ($data) {
                $query->where('user_id', '=', $data->userId);
            })
            ->when(!empty($data->categoryId), function (Builder $query) use ($data) {
                $query->where('category_id', '=', $data->categoryId);
            })
            ->orderBy('date', 'desc')
            ->get();
    }

    /**
     * @inheritDoc
     */
    public function paginate(ExpensePaginateDTO $data): LengthAwarePaginator
    {
        return Expense::query()
            ->when(!empty($data->userId), function (Builder $query) use ($data) {
                $query->where('user_id', '=', $data->userId);
            })
            ->when(!empty($data->categoryId), function (Builder $query) use ($data) {
                $query->where('category_id', '=', $data->categoryId);
            })
            ->orderBy('date', 'desc')
            ->paginate($data->perPage)
            ->withQueryString();
    }

    /**
     * @inheritDoc
     */
    public function summary(int $userId): Collection
    {
        return Expense::select(DB::raw('round(SUM(amount)::numeric, 2) AS spent'), DB::raw('count(amount) AS total'))
            ->where('user_id', '=', $userId)
            ->get();
    }

    /**
     * @inheritDoc
     */
    public function delete(int $id): bool
    {
        return Expense::destroy($id) === 1;
    }
}
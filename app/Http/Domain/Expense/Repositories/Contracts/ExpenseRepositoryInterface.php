<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\Repositories\Contracts;

use App\Http\Domain\Expense\DTO\CreateExpenseDTO;
use App\Http\Domain\Expense\DTO\ExpensePaginateDTO;
use App\Http\Domain\Expense\Models\Expense;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * ExpenseRepository handles fetching and persisting
 * the domain object Expense.
 *
 * @package App\Http\Domain\Expense\Repositories\Contracts
 */
interface ExpenseRepositoryInterface
{
    /**
     * Create a new Expense resource.
     *
     * @param \App\Http\Domain\Expense\DTO\CreateExpenseDTO $dto
     *
     * @return \App\Http\Domain\Expense\Models\Expense|null
     */
    public function create(CreateExpenseDTO $dto): ?Expense;

    /**
     * Get a listing of Expense resource.
     *
     * @param \App\Http\Domain\Expense\DTO\ExpensePaginateDTO $data
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findAll(ExpensePaginateDTO $data): Collection;

    /**
     * Get a listing of Expense resource.
     *
     * @param \App\Http\Domain\Expense\DTO\ExpensePaginateDTO $data
     *
     * @return LengthAwarePaginator
     */
    public function paginate(ExpensePaginateDTO $data): LengthAwarePaginator;

    /**
     * Delete a single Expense resource.
     *
     * @param int $id
     *
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Get an expense summary for the given user unique key.
     *
     * @param int $userId
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function summary(int $userId): Collection;
}
<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\Services\Contracts;

use App\Http\Domain\Expense\DTO\CreateExpenseDTO;
use App\Http\Domain\Expense\DTO\ExpensePaginateDTO;
use App\Http\Domain\Expense\DTO\ExpenseSummaryDTO;
use App\Http\Domain\Expense\Models\Expense;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * ExpenseServiceInterface handles the business logic
 * for the Expense domain.
 *
 * @package App\Http\Domain\Expense\Services\Contracts
 */
interface ExpenseServiceInterface
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
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Database\Eloquent\Collection
     */
    public function findMany(ExpensePaginateDTO $data): LengthAwarePaginator|Collection;

    /**
     * Delete an Expense resource.
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
     * @return \App\Http\Domain\Expense\DTO\ExpenseSummaryDTO
     */
    public function summary(int $userId): ExpenseSummaryDTO;
}
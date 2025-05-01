<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\DTO;

use Illuminate\Database\Eloquent\Collection;
use Spatie\LaravelData\Data;

/**
 * ExpenseSummaryDTO is a data transfer for expense summary.
 *
 * @package App\Http\Domain\Expense\DTO
 */
class ExpenseSummaryDTO extends Data
{
    /**
     * @param float $spent
     * @param int   $total
     */
    public function __construct(
        public float $spent,
        public int   $total,
    ) {
    }

    /**
     * fromCollection is a factory method of the ExpenseSummaryDTO class -
     * instantiate a new instance of ExpenseSummaryDTO from an
     * Eloquent collection.
     *
     * @param \Illuminate\Database\Eloquent\Collection $collection
     *
     * @return self
     */
    public static function fromCollection(Collection $collection): self
    {
        $objectLiteral = $collection->first();

        return new self((float) ($objectLiteral?->spent ?? '0'), (int) ($objectLiteral?->total ?? 0));
    }
}
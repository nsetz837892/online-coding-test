<?php
declare(strict_types = 1);

namespace App\Http\Domain\Expense\Resources;

use App\Http\Domain\Category\Resources\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ExpenseResource transforms an Expense model
 * into a JSON-friendly format.
 *
 * @package App\Http\Domain\Expense\Resources
 */
class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->resource->id,
            'description' => $this->resource->description,
            'amount'      => (float) $this->resource->amount,
            'category'    => new CategoryResource($this->resource->getCategory()),
            'date'        => $this->resource->date,
            'createdAt'   => $this->resource->created_at,
            'updatedAt'   => $this->resource->updated_at,
        ];
    }
}
<?php
declare(strict_types = 1);

namespace App\Http\Domain\Category\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * CategoryResource transforms a Category model
 * into a JSON-friendly format.
 *
 * @package App\Http\Domain\Expense\Resources
 */
class CategoryResource extends JsonResource
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
            'id'   => $this->resource->id,
            'name' => $this->resource->name,
        ];
    }
}
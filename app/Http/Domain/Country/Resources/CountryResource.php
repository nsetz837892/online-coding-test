<?php
declare(strict_types = 1);

namespace App\Http\Domain\Country\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Country domain resource.
 *
 * @package App\Http\Domain\Country\Resources
 */
class CountryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'     => $this->resource->id,
            'name'   => $this->resource->name,
            'active' => $this->resource->avtive === 1,
        ];
    }
}
<?php
declare(strict_types = 1);

namespace App\Http\Domain\User\Resources;

use App\Http\Domain\Country\Resources\CountryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * User domain resource.
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->resource->id,
            'name'      => $this->resource->name,
            'surname'   => $this->resource->surname,
            'fullName'  => $this->resource->getFullNameAttribute(),
            'email'     => $this->resource->email,
            'phone'     => $this->resource->phone,
            'username'  => $this->resource->username,
            'gender'    => $this->resource->gender,
            'country'   => new CountryResource($this->resource->getCountry()),
            'role'      => $this->resource->getRoleResource(),
            'createdAt' => $this->resource->created_at,
            'updatedAt' => $this->resource->updated_at,
            "verified"  => isset($this->resource->email_verified_at),
        ];
    }
}

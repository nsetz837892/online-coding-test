<?php
declare(strict_types = 1);

namespace App\Http\Resources\Json;

use Illuminate\Http\Resources\Json\PaginatedResourceResponse;

/**
 * AppPaginatedResourceResponse extends
 * the Illuminate - updates the meta method
 * returning custom pagination meta.
 *
 * @package App\Http\Resources\Json
 */
class AppPaginatedResourceResponse extends PaginatedResourceResponse
{
    /**
     * @param $paginated
     *
     * @return array
     */
    protected function meta($paginated): array
    {
        $metaData = parent::meta($paginated);

        return [
            'currentPage' => $metaData['current_page'] ?? null,
            'from'        => $metaData['from'] ?? null,
            'lastPage'    => $metaData['last_page'] ?? null,
            'total'       => $metaData['total'] ?? null,
            'perPage'     => $metaData['per_page'] ?? null,
            'to'          => $metaData['to'] ?? null,
            'path'        => $metaData['path'] ?? null,
            'links'       => $metaData['links'] ?? null,
        ];
    }
}
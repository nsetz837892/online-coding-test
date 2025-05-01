<?php
declare(strict_types = 1);

namespace App\Http\Resources\Json;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Symfony\Component\HttpFoundation;

/**
 * AppResourceCollection is a base application
 * resources exposing a custom pagination resource.
 *
 * @package App\Http\Resources\Json
 */
class AppResourceCollection extends ResourceCollection
{
    public function __construct(
        $resource,
        protected ?string $message = null,
        protected ?int $status = HttpFoundation\Response::HTTP_OK,
        protected bool $success = true
    ) {
        parent::__construct($resource);
    }

    /**
     * Create a paginate-aware HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function preparePaginatedResponse($request): JsonResponse
    {
        if ($this->preserveAllQueryParameters) {
            $this->resource->appends($request->query());
        } else if (!is_null($this->queryParameters)) {
            $this->resource->appends($this->queryParameters);
        }

        return (new AppPaginatedResourceResponse($this))->toResponse($request);
    }

    /**
     * Customize the pagination information for the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @param array                    $paginated
     * @param array                    $default
     *
     * @return array
     * @noinspection PhpUnusedParameterInspection, PhpUnused
     */
    public function paginationInformation(Request $request, array $paginated, array $default): array
    {
        if (isset($this->success) && is_bool($this->success)) {
            $default['success'] = $this->success;
        }

        if (isset($this->message) && is_string($this->message)) {
            $default['message'] = $this->message;
        }

        if (isset($this->status) && is_int($this->status)) {
            $default['status'] = $this->status;
        }

        return $default;
    }
}
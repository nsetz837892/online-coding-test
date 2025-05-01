<?php
declare(strict_types = 1);

namespace App\Http\Controllers\Category;

use App\Http\Controllers\AbstractController;
use App\Http\Domain\Category\DTO\CategoryPaginateDTO;
use App\Http\Domain\Category\Services\Contracts\CategoryServiceInterface;
use Illuminate\Log\Logger;
use Illuminate\Http;

/**
 * CategoryController handles RESTful API calls
 * in service of the Category domain.
 *
 * @package App\Http\Controllers\Category
 */
class CategoryController extends AbstractController
{
    /**
     * @param \Illuminate\Log\Logger                                                $logger
     * @param \App\Http\Domain\Category\Services\Contracts\CategoryServiceInterface $service
     */
    public function __construct(Logger $logger, protected CategoryServiceInterface $service)
    {
        parent::__construct($logger);
    }

    /**
     * Display a listing of Category resource.
     */
    public function index(Http\Request $request): Http\JsonResponse
    {
        return $this->success(
            $this->service->findMany(
                CategoryPaginateDTO::fromRequest($request),
            ),
            'Category listing',
        );
    }
}
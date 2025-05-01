<?php
declare(strict_types = 1);

namespace App\Http\Controllers\Expense;

use App\Http\Controllers\AbstractController;
use App\Http\Domain\Expense\DTO\CreateExpenseDTO;
use App\Http\Domain\Expense\DTO\ExpensePaginateDTO;
use App\Http\Domain\Expense\Resources\ExpenseCollection;
use App\Http\Domain\Expense\Resources\ExpenseResource;
use App\Http\Domain\Expense\Services\Contracts\ExpenseServiceInterface;
use Illuminate\Http;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation;

/**
 * ExpenseController handles RESTful API calls
 * in service of the Expense domain.
 */
class ExpenseController extends AbstractController
{
    /**
     * @param \Illuminate\Log\Logger                                              $logger
     * @param \App\Http\Domain\Expense\Services\Contracts\ExpenseServiceInterface $service
     */
    public function __construct(Logger $logger, protected ExpenseServiceInterface $service)
    {
        parent::__construct($logger);
    }

    /**
     * Display a listing of Expense resource.
     */
    public function index(Http\Request $request): ExpenseCollection
    {
        $request->query->add(['userId' => Auth::id()]);

        return new ExpenseCollection(
            $this->service->findMany(
                ExpensePaginateDTO::fromRequest($request),
            ),
            'User expense listing',
        );
    }

    /**
     * Store a newly created Expense resource in storage.
     */
    public function store(Http\Request $request): Http\JsonResponse
    {
        $request->query->add(['userId' => Auth::id()]);

        /** @var \App\Http\Domain\Expense\Models\Expense|null $expense */
        $expense = $this->service->create(CreateExpenseDTO::fromRequest($request));

        return $this->respond(
            $expense !== null ? new ExpenseResource($expense) : null,
            $expense !== null,
            $expense ? 'Expense resource created.' : 'Expense resource not created.',
            $expense ? HttpFoundation\Response::HTTP_CREATED : HttpFoundation\Response::HTTP_BAD_REQUEST,
        );
    }

    /**
     * Delete an Expense resource in storage.
     */
    public function destroy(int $id): Http\JsonResponse
    {
        $deleted = $this->service->delete($id);

        return $this->respond(
            (object) ['deleted' => $this->service->delete($id)],
            $deleted,
            $deleted ? 'Expense resource deleted.' : 'Expense resource not deleted.',
            $deleted ? HttpFoundation\Response::HTTP_OK : HttpFoundation\Response::HTTP_BAD_REQUEST,
        );
    }

    /**
     * Get an expense summary for the given user unique key.
     */
    public function summary(): Http\JsonResponse
    {
        return $this->success(
            $this->service->summary(Auth::id()),
            'User expense summary',
        );
    }
}

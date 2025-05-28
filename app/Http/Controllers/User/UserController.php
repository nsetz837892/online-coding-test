<?php
declare(strict_types = 1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\AbstractController;
use App\Http\Domain\User\DTO\CreateUserDTO;
use App\Http\Domain\User\DTO\UpdateUserDTO;
use App\Http\Domain\User\DTO\UserPaginateDTO;
use App\Http\Domain\User\Resources\UserCollection;
use App\Http\Domain\User\Resources\UserResource;
use App\Http\Domain\User\Services\Contracts\UserServiceInterface;
use Illuminate\Http;
use Illuminate\Log\Logger;
use Symfony\Component\HttpFoundation;

/**
 * UserController handles RESTful API calls
 * in service of the User domain.
 *
 * @package App\Http\Controllers\User
 */
class UserController extends AbstractController
{
    /**
     * @param \Illuminate\Log\Logger                                        $logger
     * @param \App\Http\Domain\User\Services\Contracts\UserServiceInterface $service
     */
    public function __construct(Logger $logger, protected UserServiceInterface $service)
    {
        parent::__construct($logger);
    }

    /**
     * Display a listing of User resource.
     */
    public function index(Http\Request $request): UserCollection
    {
        return new UserCollection(
            $this->service->findMany(
                UserPaginateDTO::fromRequest($request),
            ),
            'User listing',
        );
    }

    /**
     * Get a User resource by unique key.
     */
    public function show(int $id): Http\JsonResponse
    {
        return $this->success(
            new UserResource(
                $this->service->find($id)
            ),
            'User resource'
        );
    }

    /**
     * Store a newly created User resource in storage.
     */
    public function store(Http\Request $request): Http\JsonResponse
    {
        /** @var \App\Http\Domain\User\Models\User|null $user */
        $user = $this->service->create(CreateUserDTO::fromRequest($request));

        return $this->respond(
            new UserResource($user),
            $user !== null,
            $user ? 'User resource created.' : 'User resource not created.',
            $user ? HttpFoundation\Response::HTTP_CREATED : HttpFoundation\Response::HTTP_BAD_REQUEST,
        );
    }

    /**
     * Update a User resource in storage.
     */
    public function update(int $id, Http\Request $request): Http\JsonResponse
    {
        /** @var \App\Http\Domain\User\Models\User|null $user */
        $user = $this->service->update($id, UpdateUserDTO::fromRequest($request));

        return $this->respond(
            new UserResource($user),
            $user !== null,
            $user ? 'User resource updated.' : 'User resource not updated.',
            $user ? HttpFoundation\Response::HTTP_OK : HttpFoundation\Response::HTTP_BAD_REQUEST,
        );
    }

    /**
     * Delete a User resource in storage.
     */
    public function destroy(int $id): Http\JsonResponse
    {
        $deleted = $this->service->delete($id);

        return $this->respond(
            (object) ['deleted' => $deleted],
            $deleted,
            $deleted ? 'User resource deleted.' : 'User resource not found.',
            $deleted ? HttpFoundation\Response::HTTP_OK : HttpFoundation\Response::HTTP_BAD_REQUEST,
        );
    }
}
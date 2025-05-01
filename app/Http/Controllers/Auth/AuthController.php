<?php
declare(strict_types = 1);

namespace App\Http\Controllers\Auth;

use App\Http\Domain\Auth\DTO\AuthResource;
use App\Http\Controllers\AbstractController;
use App\Http\Domain\Auth\Requests\LoginRequest;
use App\Http\Domain\User\Services\Contracts\UserServiceInterface;
use Illuminate\Http;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation;
use Exception;

/**
 * AuthController handles RESTful API calls
 * in request of guest users.
 *
 * @package App\Http\Controllers\Auth
 */
class AuthController extends AbstractController
{
    /**
     * Controller constructor.
     *
     * @param \Illuminate\Log\Logger                                        $logger
     * @param \App\Http\Domain\User\Services\Contracts\UserServiceInterface $service
     */
    public function __construct(Logger $logger, protected readonly UserServiceInterface $service)
    {
        parent::__construct($logger);
    }

    /**
     * Set the auth credential for username.
     *
     * @return string
     */
    public function username(): string
    {
        return 'username';
    }

    /**
     * login authenticates a set of credential.
     *
     * @param \App\Http\Domain\Auth\Requests\LoginRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request): Http\JsonResponse
    {
        try {
            $request->authenticate();
        } catch (Exception $error) {
            return $this->error($error->getMessage(), HttpFoundation\Response::HTTP_UNAUTHORIZED);
        }

        /** @var \Illuminate\Contracts\Auth\Authenticatable $user The currently authenticated user */
        $user = Auth::user();

        return $this->success(
            AuthResource::fromUser($user),
            __('auth.success')
        );
    }

    /**
     * login authenticates a set of credential.
     *
     * @param \App\Http\Domain\Auth\Requests\LoginRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function token(LoginRequest $request): Http\JsonResponse
    {
        /** @var \App\Http\Domain\User\Models\User|null $user */

        try {
            $user = $request->authenticateToken();
        } catch (Exception $error) {
            return $this->error($error->getMessage(), HttpFoundation\Response::HTTP_UNAUTHORIZED);
        }

        return $this->success(
            AuthResource::fromUser($user),
            __('auth.success')
        );
    }

    /**
     * logout does session-based authentication session destruction.
     * Terminates the currently authenticated users' session.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Http\Request $request): Http\JsonResponse
    {
        $request->user()->tokens()->delete();

        return $this->success(null, __('app.logout_success'));
    }
}
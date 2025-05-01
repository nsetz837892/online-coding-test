<?php
declare(strict_types = 1);

namespace App\Http\Controllers\Auth;

use App\Http\Domain\Auth\DTO\AuthResource;
use App\Http\Controllers\AbstractController;
use App\Http\Domain\Auth\Requests\LoginRequest;
use Illuminate\Http;
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
     * logout does session-based authentication session destruction.
     * Terminates the currently authenticated users' session.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(): Http\JsonResponse
    {
        auth()->logout();

        return $this->success(null, __('app.logout_success'));
    }
}
<?php
declare(strict_types = 1);

namespace App\Http\Domain\Auth\Requests;

use App\Http\Domain\User\Models\User;
use App\Http\Domain\User\Services\Contracts\UserServiceInterface;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/**
 * LoginRequest authenticates the request's credentials.
 */
class LoginRequest extends FormRequest
{
    /**
     * @param \App\Http\Domain\User\Services\Contracts\UserServiceInterface $service
     */
    public function __construct(protected readonly UserServiceInterface $service)
    {
        parent::__construct();
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'min:1', 'max:100'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if (!Auth::attempt($this->only('username', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                                                        'username' => __('auth.failed'),
                                                    ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Attempt to authenticate the request's credentials
     * with a token.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticateToken(): User
    {
        $this->ensureIsNotRateLimited();

        $user = $this->service->findByUsername($this->username);

        if (!$user || !Hash::check($this->password, $user->password)) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                                                        'username' => __('auth.failed'),
                                                    ]);
        }

        RateLimiter::clear($this->throttleKey());

        return $user;
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
                                                    'username' => __('auth.throttle', [
                                                        'seconds' => $seconds,
                                                        'minutes' => ceil($seconds / 60),
                                                    ]),
                                                ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('username')) . '|' . $this->ip());
    }
}

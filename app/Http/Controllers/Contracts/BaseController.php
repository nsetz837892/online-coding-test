<?php
declare(strict_types = 1);

namespace App\Http\Controllers\Contracts;

use Illuminate\Http;
use Symfony\Component\HttpFoundation;

/**
 * BaseController exposes common
 * methods in a controller context.
 *
 * @package App\Http\Controllers\Contracts
 */
interface BaseController
{
    /**
     * respond returns a standard JSON response format.
     *
     * @param mixed    $data
     * @param bool     $success
     * @param string   $message
     * @param int|null $status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respond(mixed $data, bool $success, string $message, ?int $status = null): Http\JsonResponse;

    /**
     * Returns a standard JSON response format
     * in a success state.
     *
     * @param mixed    $data
     * @param string   $message
     * @param int|null $status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function success(mixed $data, string $message, ?int $status = null): Http\JsonResponse;

    /**
     * Returns a standard JSON response format
     * in an error state.
     *
     * @param string $message
     * @param int    $code
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function error(
        string $message,
        int    $code = HttpFoundation\Response::HTTP_BAD_REQUEST
    ): Http\JsonResponse;
}
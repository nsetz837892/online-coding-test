<?php
declare(strict_types = 1);

namespace App\Http\Controllers;

use Illuminate\Http;
use Symfony\Component\HttpFoundation;

/**
 * IndexController.
 */
class IndexController extends Controller
{
    /**
     * Returns info about the API
     */
    public function show(): Http\JsonResponse
    {
        return new Http\JsonResponse(
            (object) [
                'name'    => 'Online Coding Test API',
                'version' => '0.0.1',
            ],
            HttpFoundation\Response::HTTP_OK
        );
    }
}
<?php

use App\Http\Middleware\HandleAppearance;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Laravel\Sanctum\Http\Middleware\CheckAbilities;
use Laravel\Sanctum\Http\Middleware\CheckForAnyAbility;
use Symfony\Component\HttpFoundation;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web:      __DIR__ . '/../routes/web.php',
        api:      __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health:   '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
                               'abilities' => CheckAbilities::class,
                               'ability'   => CheckForAnyAbility::class,
                           ]);

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->statefulApi();

        $middleware->web(append: [
                                     HandleAppearance::class,
                                     AddLinkHeadersForPreloadedAssets::class,
                                 ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Exception $e) {
            $status = HttpFoundation\Response::HTTP_BAD_REQUEST;

            if ($e instanceof HttpException) {
                $status = $e->getStatusCode();
            } else if ($e->getMessage() === 'Unauthenticated.') {
                $status = HttpFoundation\Response::HTTP_FORBIDDEN;
            }

            return response()->json([
                                        'success' => false,
                                        'message' => $e->getMessage(),
                                        'status'  => $status,
                                        'data'    => null,
                                    ], HttpFoundation\Response::HTTP_OK);
        });
    })->create();
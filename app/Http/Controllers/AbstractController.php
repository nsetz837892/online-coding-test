<?php
declare(strict_types = 1);

namespace App\Http\Controllers;

use App\Contracts\ToObject;
use App\Http\Controllers\Contracts\BaseController as BaseControllerContract;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http;
use Illuminate\Log\Logger;
use Illuminate\Routing\Controller as BaseController;
use Symfony\Component\HttpFoundation;

/**
 * AbstractController is a base application controller.
 *
 * @package App\Http\Controllers
 */
abstract class AbstractController extends BaseController implements BaseControllerContract
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;

    /**
     * @psalm-readonly
     * @var \Illuminate\Log\Logger
     */
    protected Logger $logger;

    /**
     * Controller constructor.
     *
     * @param \Illuminate\Log\Logger $logger
     */
    public function __construct(Logger $logger)
    {
        $this->logger = $logger;
    }

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
    public function respond(mixed $data, bool $success, string $message, ?int $status = null): Http\JsonResponse
    {
        /** @var mixed $finalData */

        if ($data instanceof ToObject) {
            $finalData = $data->toObject();
        } else if ($data instanceof Arrayable) {
            $finalData = $data->toArray();
        } else {
            $finalData = $data;
        }

        return response()->json([
                                    'success' => $success,
                                    'message' => $message,
                                    'status'  => $status ?? HttpFoundation\Response::HTTP_OK,
                                    'data'    => $finalData,
                                ], HttpFoundation\Response::HTTP_OK);
    }

    /**
     * success returns a standard JSON response format.
     *
     * @param mixed    $data
     * @param string   $message
     * @param int|null $status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function success(mixed $data, string $message, ?int $status = null): Http\JsonResponse
    {
        return $this->respond($data, true, $message, $status ?? HttpFoundation\Response::HTTP_OK);
    }

    /**
     * created returns a standard JSON response format.
     *
     * @param mixed  $data
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function created(mixed $data, string $message): Http\JsonResponse
    {
        return $this->success($data, $message, HttpFoundation\Response::HTTP_CREATED);
    }

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
    ): Http\JsonResponse {
        return response()->json([
                                    'success' => false,
                                    'message' => $message,
                                    'status'  => $code,
                                    'data'    => null,
                                ], HttpFoundation\Response::HTTP_OK);
    }
}

<?php
declare(strict_types = 1);

namespace App\Contracts;

/**
 * @package App\Contracts
 */
interface ToObject
{
    /**
     * @return object
     */
    public function toObject(): object;
}
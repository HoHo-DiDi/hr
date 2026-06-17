<?php

namespace App\Exceptions;

use Exception;

class LeaveTypeDeleteBlockedException extends Exception
{
    public function __construct()
    {
        parent::__construct('This leave type is already in use and cannot be deleted.');
    }
}

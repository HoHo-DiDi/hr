<?php

namespace App\Exceptions;

use Exception;

class LeaveTypeSymbolUpdateBlockedException extends Exception
{
    public function __construct()
    {
        parent::__construct("Symbol cannot be changed because this leave type is already in use.");
    }
}

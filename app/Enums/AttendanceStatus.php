<?php

namespace App\Enums;

enum AttendanceStatus: string
{
    case PRESENT = 'P';
    case LATE = 'L';
    case CASUAL_LEAVE = 'CL';
    case ABSENT = 'A';
    case HOLIDAY = 'H';
}

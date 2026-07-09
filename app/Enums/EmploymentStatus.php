<?php

namespace App\Enums;

enum EmploymentStatus: string
{
    case IN_PROBATION = 'in_probation';
    case PERMANENT = 'permanent';
    case RESIGNED = 'resigned';

    public function label(): string
    {
        return match ($this) {
            self::IN_PROBATION => 'In Probation',
            self::PERMANENT => 'Permanent',
            self::RESIGNED => 'Resigned'
        };
    }

    public function options(): array
    {
        return [
            self::IN_PROBATION->value => self::IN_PROBATION->label(),
            self::PERMANENT->value => self::PERMANENT->label(),
            self::RESIGNED->value => self::RESIGNED->label(),
        ];
    }
}

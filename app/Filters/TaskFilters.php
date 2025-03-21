<?php

namespace App\Filters;

use Essa\APIToolKit\Filters\QueryFilters;

class TaskFilters extends QueryFilters
{
    // protected array $columnSearch = [];
    protected array $allowedFilters = ['priority', 'due_date']; // Allowed filters
    protected array $allowedSorts = ['created_at', 'due_date', 'priority']; // Allowed sorting fields
    protected array $allowedIncludes = []; // Allowed relationships for eager loading

    // Custom filter for priority
    public function priority($value)
    {
        return $this->builder->where('priority', $value);
    }

    // Custom filter for due_date
    public function dueDate($value)
    {
        return $this->builder->whereDate('due_date', $value);
    }
}
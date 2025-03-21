<?php

namespace App\Models;

use Essa\APIToolKit\Filters\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes ,Filterable;

    protected string $default_filters = \App\Filters\TaskFilters::class;
    protected $fillable = ['title', 'description', 'priority', 'due_date'];
}

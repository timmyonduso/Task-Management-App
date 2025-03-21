<?php

namespace App\Actions;

use App\Models\Task;

class CreateTask
{
    public function execute(array $data): Task
    {
        return Task::create($data);
    }
}
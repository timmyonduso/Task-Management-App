<?php

namespace App\Actions;

use App\Models\Task;

class UpdateTask
{
    public function execute(Task $task, array $data): Task
    {
        $task->update($data);
        return $task;
    }
}
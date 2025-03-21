<?php

namespace App\Actions;

use App\Models\Task;

class DeleteTask
{
    public function execute(Task $task): void
    {
        $task->delete();
    }
}
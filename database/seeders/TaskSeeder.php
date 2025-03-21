<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Complete Laravel API',
                'description' => 'Build a RESTful API for task management.',
                'priority' => 'high',
                'due_date' => now()->addDays(3),
            ],
            [
                'title' => 'Set Up React Frontend',
                'description' => 'Integrate React with Inertia for the frontend.',
                'priority' => 'medium',
                'due_date' => now()->addDays(5),
            ],
            [
                'title' => 'Write Unit Tests',
                'description' => 'Write tests for the Task API endpoints.',
                'priority' => 'medium',
                'due_date' => now()->addDays(7),
            ],
            [
                'title' => 'Deploy Application',
                'description' => 'Deploy the application to a production server.',
                'priority' => 'low',
                'due_date' => now()->addDays(10),
            ],
            [
                'title' => 'Document the Project',
                'description' => 'Write documentation for the task management system.',
                'priority' => 'low',
                'due_date' => now()->addDays(14),
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}

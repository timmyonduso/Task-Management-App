<?php

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// ✅ Test Task Creation (store)
test('a user can create a task', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $taskData = [
        'title' => 'New Task',
        'description' => 'This is a test task',
        'priority' => 'medium',
        'due_date' => now()->addDays(3)->toDateTimeString(),
    ];

    $response = $this->post(route('tasks.store'), $taskData);

    $response->assertRedirect(route('tasks.index'));
    $this->assertDatabaseHas('tasks', ['title' => 'New Task']);
});

// ✅ Test Task Deletion (destroy)
test('a user can delete a task', function () {
    $user = User::factory()->create();
    $task = Task::factory()->create(['title' => 'Task to Delete']);

    $this->actingAs($user);

    $response = $this->delete(route('tasks.destroy', $task));

    $response->assertRedirect(route('tasks.index'));

    // ✅ Instead of checking for a missing row, check that `deleted_at` is set
    $this->assertSoftDeleted('tasks', ['id' => $task->id]);
});


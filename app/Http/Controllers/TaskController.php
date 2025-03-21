<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Essa\APIToolKit\Api\ApiResponse;
use App\Actions\CreateTask;
use App\Actions\UpdateTask;
use App\Actions\DeleteTask;

class TaskController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the tasks.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Apply filters, sorting, and pagination
        $perPage = $request->input('per_page', config('api-tool-kit.default_pagination_number'));
        $tasks = Task::useFilters()->dynamicPaginate($perPage);

            // Ensure sorting by 'created_at' in descending order by default
        $tasks = Task::useFilters()
            ->orderBy('created_at', 'desc') // Explicitly apply default sorting
            ->dynamicPaginate($perPage);

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Display the specified task.
     *
     * @param Task $task
     * @return \Inertia\Response
     */
    public function show(Task $task)
    {
        return Inertia::render('Tasks/Show', [
            'task' => $task
        ]);
    }

    /**
     * Store a newly created task in storage.
     *
     * @param StoreTaskRequest $request
     * @param CreateTask $createTask
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreTaskRequest $request, CreateTask $createTask)
    {
        try {
            $task = $createTask->execute($request->validated());

            return redirect()->route('tasks.index')
                ->with('message', 'Task created successfully!');
        } catch (\Exception $e) {
            return $this->responseUnprocessable('Task creation failed', $e->getMessage());
        }
    }

    /**
     * Update the specified task in storage.
     *
     * @param UpdateTaskRequest $request
     * @param Task $task
     * @param UpdateTask $updateTask
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateTaskRequest $request, Task $task, UpdateTask $updateTask)
    {
        try {
            $updateTask->execute($task, $request->validated());

            return redirect()->route('tasks.index')
                ->with('message', 'Task updated successfully!');
        } catch (\Exception $e) {
            return $this->responseUnprocessable('Task update failed', $e->getMessage());
        }
    }

    /**
     * Remove the specified task from storage.
     *
     * @param Task $task
     * @param DeleteTask $deleteTask
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Task $task, DeleteTask $deleteTask)
    {
        try {
            $deleteTask->execute($task);

            return redirect()->route('tasks.index')
                ->with('message', 'Task deleted successfully!');
        } catch (\Exception $e) {
            return $this->responseUnprocessable('Task deletion failed', $e->getMessage());
        }
    }
}
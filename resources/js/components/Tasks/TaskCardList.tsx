"use client"

import type React from "react"
import { PencilIcon, TrashIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { router } from "@inertiajs/react"

import type { Task } from "@/types"
import { getPriorityColor } from "@/utils/priority-utils"
import { formatDate } from "@/utils/date-formatter"

interface TaskCardListProps {
  tasks: Task[]
  onToggleCompletion: (id: number) => void
  onEditTask: (task: Task) => void
  onDeleteTask?: (id: number) => void
}

export const TaskCardList: React.FC<TaskCardListProps> = ({
  tasks,
  onToggleCompletion,
}) => {

  const goToTaskDetail = (taskId: number) => {
    router.get(`/tasks/${taskId}`);
  };

  return (
    <div className="md:hidden space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow border-l-4 ${task.priority === "high"
                ? "border-red-500"
                : task.priority === "medium"
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <Checkbox
                  className="mt-1 h-5 w-5 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-3"
                  checked={task.completed}
                  onCheckedChange={() => onToggleCompletion(task.id)}
                  onClick={(e) => e.stopPropagation()} 
                />
                <div
                  className="cursor-pointer flex-grow"
                  onClick={() => goToTaskDetail(task.id)}
                >
                  <h3
                    className={`text-sm font-medium ${task.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"}`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`text-xs mt-1 ${task.completed ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.get(`/tasks/${task.id}?edit=true`);
                  }}
                  className="text-indigo-600 dark:text-indigo-400"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Are you sure you want to delete this task?")) {
                      router.delete(`/tasks/${task.id}`);
                    }
                  }}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>

              </div>
            </div>
            <div
              className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={() => goToTaskDetail(task.id)}
            >
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <span>{formatDate(task.due_date)}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <p className="text-gray-500 dark:text-gray-400">No tasks found. Create a new task to get started.</p>
        </div>
      )}
    </div>
  )
}

export default TaskCardList
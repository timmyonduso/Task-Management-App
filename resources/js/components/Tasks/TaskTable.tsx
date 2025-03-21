"use client"

import type React from "react"
import { PencilIcon, TrashIcon } from "lucide-react"

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { router } from "@inertiajs/react"

import type { Task } from "@/types"
import { getPriorityColor } from "@/utils/priority-utils"
import { formatDate } from "@/utils/date-formatter"

interface TaskTableProps {
  tasks: Task[]
  onToggleCompletion: (id: number) => void
  onEditTask: (task: Task) => void
  onDeleteTask?: (id: number) => void
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onToggleCompletion,
  onEditTask,
  onDeleteTask = () => { },
}) => {


  const goToTaskDetail = (taskId: number) => {
    router.get(`/tasks/${taskId}`);
  };

  return (
    <div className="hidden md:block overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Priority
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Due Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className={task.completed ? "bg-gray-50 dark:bg-gray-700" : ""}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Checkbox
                            className="h-5 w-5 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            checked={task.completed}
                            onCheckedChange={() => onToggleCompletion(task.id)}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-white px-2 py-1 rounded text-xs" sideOffset={5}>
                        {task.completed ? "Mark as incomplete" : "Mark as complete"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-medium cursor-pointer ${task.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"}`}
                    onClick={() => goToTaskDetail(task.id)}
                  >
                    {task.title}
                  </div>
                  {task.description && (
                    <div
                      className={`cursor-pointer text-xs ${task.completed ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"}`}
                      onClick={() => goToTaskDetail(task.id)}
                    >
                      {task.description.length > 50 ? `${task.description.substring(0, 50)}...` : task.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(task.due_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.get(`/tasks/${task.id}?edit=true`);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 text-white px-2 py-1 rounded text-xs" sideOffset={5}>
                          Edit
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this task?")) {
                                router.delete(`/tasks/${task.id}`);
                              }
                            }}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>

                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 text-white px-2 py-1 rounded text-xs" sideOffset={5}>
                          Delete
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center"
              >
                No tasks found. Create a new task to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TaskTable


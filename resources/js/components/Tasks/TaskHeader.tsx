"use client"

import type React from "react"
import { PlusIcon } from "lucide-react"

interface TaskHeaderProps {
  onAddTask: () => void
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ onAddTask }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h1>

      <button
        onClick={onAddTask}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center"
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Add Task
      </button>
    </div>
  )
}

export default TaskHeader


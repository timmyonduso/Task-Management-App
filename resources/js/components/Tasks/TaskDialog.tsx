"use client"

import type React from "react"
import { XIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { router } from "@inertiajs/react"
import type { Task } from "@/types"
import { useEffect } from "react"

interface TaskDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedTask: Task | null
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ isOpen, onOpenChange, selectedTask }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert FormData to a plain object that Inertia can work with properly
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      due_date: formData.get('due_date'),
    };

    if (selectedTask) {
      // Update existing task with proper data
      router.put(`/tasks/${selectedTask.id}`, data, {
        onSuccess: () => {
          onOpenChange(false);
        },
        preserveScroll: true,
      });
    } else {
      // Create new task
      router.post('/tasks', data, {
        onSuccess: () => {
          onOpenChange(false);
          // Optional: You could add a reset form function here if needed
        },
        preserveScroll: true,
      });
    }
  };

  // Reset form when dialog opens/closes or task selection changes
  useEffect(() => {
    // Form will use defaultValues, no explicit reset needed
  }, [isOpen, selectedTask]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <DialogTitle className="text-lg font-medium text-gray-900 dark:text-white">
          {selectedTask ? "Edit Task" : "Create Task"}
        </DialogTitle>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={selectedTask?.title || ""}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={selectedTask?.description || ""}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue={selectedTask?.priority || "medium"}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              type="datetime-local"
              id="due_date"
              name="due_date"
              defaultValue={selectedTask?.due_date?.replace("Z", "") || ""}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <DialogClose asChild>
              <button 
                type="button" 
                className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 dark:text-gray-300"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </button>
            </DialogClose>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              {selectedTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>

        <DialogClose asChild>
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-500" aria-label="Close">
            <XIcon className="h-5 w-5" />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
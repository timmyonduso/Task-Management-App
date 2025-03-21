"use client"
import { useState } from "react"
import { Head } from "@inertiajs/react"

import AppLayout from "@/layouts/app-layout"
import type { Task, BreadcrumbItem } from "@/types"
import { TaskTable, TaskCardList, TaskDialog, TaskHeader } from "@/components/Tasks"

interface PageProps {
  tasks: {
    data: Task[] // The paginated tasks are now nested under `data`
    meta: {
      current_page: number
      from: number
      last_page: number
      links: { url: string | null; label: string; active: boolean }[]
      path: string
      per_page: number
      to: number
      total: number
    }
    links: {
      first: string | null
      last: string | null
      prev: string | null
      next: string | null
    }
  }
}

export default function Index({ tasks: initialTasks }: PageProps) {
  // Define breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Tasks",
      href: "/tasks",
    },
  ]

  // State for tasks with added UI state
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.data.map((task) => ({ ...task, completed: false })) // Use `initialTasks.data` instead of `initialTasks`
  )

  // State for task dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Function to toggle task completion
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Function to open the task dialog
  const openTaskDialog = (task: Task | null = null) => {
    setSelectedTask(task)
    setIsDialogOpen(true)
  }

  // Function to handle task deletion
  const handleDeleteTask = (id: number) => {
    // Implement deletion logic here
    // For now, just filter out the task
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Function to handle form submission
  const handleFormSubmit = (formData: FormData) => {
    const id = formData.get("id")

    if (id) {
      // Update existing task
      const taskId = Number(id)
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                priority: formData.get("priority") as "low" | "medium" | "high",
                due_date: formData.get("due_date") as string,
              }
            : task,
        ),
      )
    } else {
      // Create new task
      // In a real app, you'd make an API call and get a real ID
      const newTask: Task = {
        id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        priority: formData.get("priority") as "low" | "medium" | "high",
        due_date: formData.get("due_date") as string,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        completed: false,
      }
      setTasks([...tasks, newTask])
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tasks" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <TaskHeader onAddTask={() => openTaskDialog()} />

        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border">
          <div className="p-4">
            {/* Task Table for desktop */}
            <TaskTable
              tasks={tasks}
              onToggleCompletion={toggleTaskCompletion}
              onEditTask={openTaskDialog}
              onDeleteTask={handleDeleteTask}
            />

            {/* Task Cards for mobile */}
            <TaskCardList
              tasks={tasks}
              onToggleCompletion={toggleTaskCompletion}
              onEditTask={openTaskDialog}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>

      {/* Task Dialog Component */}
      <TaskDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedTask={selectedTask}
        // onSubmit={handleFormSubmit}
      />
    </AppLayout>
  )
}
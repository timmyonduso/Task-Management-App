import { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    PencilIcon,
    TrashIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    AlertCircleIcon,
    TagIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/utils/date-formatter";
import { getPriorityColor } from "@/utils/priority-utils";
import AppLayout from "@/layouts/app-layout";
import TaskDialog from "@/components/Tasks/TaskDialog";
import { BreadcrumbItem, Task } from "@/types";

interface Props {
    task: Task;
}

export default function Show({ task }: Props) {
    // Function to get the priority icon
    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high':
                return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
            case 'medium':
                return <ClockIcon className="h-5 w-5 text-yellow-500" />;
            case 'low':
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            default:
                return <TagIcon className="h-5 w-5 text-gray-500" />;
        }
    };



    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Tasks", href: "/tasks" },
    ];

    // Check if edit=true is in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const shouldOpenDialog = searchParams.get("edit") === "true";

    // Format dates for display
    const formattedDueDate = task.due_date ? formatDate(task.due_date) : 'No due date';
    const formattedCreatedAt = formatDate(task.created_at);
    const formattedUpdatedAt = formatDate(task.updated_at);

    // State for managing the dialog
    const [isDialogOpen, setIsDialogOpen] = useState(shouldOpenDialog);

    const handleFormSubmit = (formData: FormData) => {
        router.put(`/tasks/${task.id}`, formData, {
            onSuccess: () => setIsDialogOpen(false),
        });
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this task?")) {
          router.delete(`/tasks/${task.id}`, {
            onSuccess: () => router.get("/tasks"), // Redirect to tasks list after deletion
          });
        }
      };
      

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Task: ${task.title}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-6">
                    <Link href="/tasks" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to Tasks
                    </Link>
                </div>

                <Card className="overflow-hidden border-t-4" style={{ borderTopColor: getPriorityColor(task.priority) }}>
                    <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl sm:text-2xl font-bold">{task.title}</CardTitle>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
                                    <PencilIcon className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" onClick={handleDelete}>
                                    <TrashIcon className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <div className="flex flex-col space-y-6">
                            {/* Task details */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</h3>
                                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                                    {task.description || "No description provided."}
                                </p>
                            </div>

                            {/* Task metadata */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Task Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            {getPriorityIcon(task.priority)}
                                            <div className="ml-3">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Priority</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            <div className="ml-3">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{formattedDueDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Activity</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            <div className="ml-3">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{formattedCreatedAt}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            <div className="ml-3">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{formattedUpdatedAt}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="bg-gray-50 dark:bg-gray-800/50 py-4 px-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="w-full flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Task #{task.id}
                            </span>

                            <Button
                                variant="default"
                                onClick={() => router.post(`/tasks/${task.id}/toggle-status`)}
                                className={task.completed ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"}
                            >
                                {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Task Dialog for Editing */}
            <TaskDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} selectedTask={task} />
        </AppLayout>
    );
}

// Define TypeScript interfaces
export interface Task {
    id: number;
    title: string;
    description: string | null;
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    completed?: boolean; // Add completed property for UI state
}

export interface PageProps {
    tasks: Task[];
}

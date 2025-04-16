export interface Chore {
    id: string;
    title: string;
    description?: string;
    assignedTo?: string;
    completed: boolean;
    dueDate?: string;
  }
  
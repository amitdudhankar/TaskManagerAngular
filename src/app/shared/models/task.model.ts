export interface Task {
  id?: number;              // optional for new tasks
  title: string;
  description?: string;
  completed?: boolean;
}

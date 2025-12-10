export interface Task {
  id?: number,
  taskOwner: string;
  taskName: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  reminder?: Date;
  priority: string;
  status: string;
}

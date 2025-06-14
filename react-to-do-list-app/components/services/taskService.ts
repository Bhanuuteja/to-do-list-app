
import { Task } from '../types';

const STORAGE_KEY = 'reactTodoListTasks';

const getStoredTasks = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const storeTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Simulate API latency
const simulateDelay = <T,>(data: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), 500));
};

export const taskService = {
  fetchTasks: async (): Promise<Task[]> => {
    const tasks = getStoredTasks();
    return simulateDelay(tasks.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ));
  },

  createTask: async (text: string): Promise<Task> => {
    const tasks = getStoredTasks();
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [newTask, ...tasks];
    storeTasks(updatedTasks);
    return simulateDelay(newTask);
  },

  updateTask: async (id: string, updates: Partial<Pick<Task, 'text' | 'completed'>>): Promise<Task> => {
    let tasks = getStoredTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks[taskIndex] = updatedTask;
    storeTasks(tasks);
    return simulateDelay(updatedTask);
  },

  deleteTask: async (id: string): Promise<{ success: boolean }> => {
    let tasks = getStoredTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    if (tasks.length === filteredTasks.length) {
        throw new Error('Task not found for deletion');
    }
    storeTasks(filteredTasks);
    return simulateDelay({ success: true });
  },
};

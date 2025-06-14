
import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  isLoading: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onEdit, onDelete, isLoading }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-slate-400 py-6">No tasks to display.</p>;
  }

  return (
    <ul className={`space-y-3 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;

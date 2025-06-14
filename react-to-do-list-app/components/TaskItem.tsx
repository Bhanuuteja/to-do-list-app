
import React from 'react';
import { Task } from '../types';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <li className={`flex items-center justify-between p-4 bg-slate-700 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-center flex-grow min-w-0 mr-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="form-checkbox h-5 w-5 text-sky-500 bg-slate-600 border-slate-500 rounded focus:ring-sky-500 cursor-pointer mr-4 flex-shrink-0"
        />
        <span className={`flex-grow truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
          {task.text}
        </span>
      </div>
      <div className="flex space-x-2 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-slate-400 hover:text-sky-400 transition-colors"
          aria-label="Edit task"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(task)}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Delete task"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

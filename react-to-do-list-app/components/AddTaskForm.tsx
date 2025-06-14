
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
  isLoading: boolean;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, isLoading }) => {
  const [taskText, setTaskText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-grow p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors text-slate-100 placeholder-slate-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold p-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || !taskText.trim()}
      >
        <PlusIcon className="w-5 h-5 mr-0 sm:mr-2" />
        <span className="hidden sm:inline">Add Task</span>
      </button>
    </form>
  );
};

export default AddTaskForm;

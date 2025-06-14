
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTaskData: { text: string }) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, isOpen, onClose, onSave }) => {
  const [editText, setEditText] = useState<string>('');

  useEffect(() => {
    if (task) {
      setEditText(task.text);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      onSave({ text: editText.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-semibold mb-6 text-sky-400">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors text-slate-100 placeholder-slate-400 min-h-[100px] mb-6"
            rows={3}
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-600 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors font-semibold disabled:opacity-50"
              disabled={!editText.trim() || editText.trim() === task.text}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

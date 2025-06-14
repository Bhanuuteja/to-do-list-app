
import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import { taskService } from './services/taskService';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import ConfirmationModal from './components/ConfirmationModal';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskService.fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (text: string) => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const newTask = await taskService.createTask(text);
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (err) {
      setError('Failed to add task.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const updatedTask = await taskService.updateTask(taskId, { completed: !task.completed });
      setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (err) {
      setError('Failed to update task status.');
      console.error(err);
    }
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  const handleSaveTask = async (updatedTaskData: { text: string }) => {
    if (!editingTask) return;
    setIsLoading(true);
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, { text: updatedTaskData.text });
      setTasks(prevTasks => prevTasks.map(t => t.id === editingTask.id ? updatedTask : t));
      setEditingTask(null);
    } catch (err) {
      setError('Failed to save task.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenDeleteConfirm = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleCloseDeleteConfirm = () => {
    setTaskToDelete(null);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    setIsLoading(true);
    try {
      await taskService.deleteTask(taskToDelete.id);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    } catch (err) {
      setError('Failed to delete task.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
        <div className="bg-slate-800 shadow-2xl rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-sky-400">Add New Task</h2>
          <AddTaskForm onAddTask={handleAddTask} isLoading={isLoading} />
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-6 shadow-lg animate-pulse" role="alert">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <div className="bg-slate-800 shadow-2xl rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-sky-400">Your Tasks</h2>
          {isLoading && tasks.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <LoadingSpinner />
            </div>
          ) : tasks.length === 0 && !isLoading ? (
            <p className="text-center text-slate-400 py-10">No tasks yet. Add one above!</p>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteConfirm}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={!!editingTask}
          onClose={handleCloseEditModal}
          onSave={handleSaveTask}
        />
      )}

      {taskToDelete && (
        <ConfirmationModal
          isOpen={!!taskToDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the task: "${taskToDelete.text}"? This action cannot be undone.`}
          onConfirm={handleDeleteTask}
          onCancel={handleCloseDeleteConfirm}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
      <Footer />
    </div>
  );
};

export default App;

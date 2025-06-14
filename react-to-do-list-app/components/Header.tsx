
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-sky-400">
             To-Do List Task
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

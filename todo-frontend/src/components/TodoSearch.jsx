import React from "react";
import { useState } from "react";



function TodoSearch({ filters, setFilters, loadTodos }) {
  return (
    <div className="mt-4 flex items-center gap-2 w-full">
      <input
        type="text"
        value={filters.search}
        
        onChange={(e) => setFilters(prev => ({
                  ...prev,
                  search: e.target.value,
                  page: 0
                }))}
        onKeyDown={(e) => e.key === "Enter" && loadTodos()}
        placeholder="Search for a todo"
        className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2
             focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/*<button
        onClick={() => loadTodos()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
        */}
      <button
        onClick={() => setFilters(prev => ({
                  ...prev,
                  search: "",
                  page: 0
                }))}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Clear
      </button>
    </div>
  );
}

export default TodoSearch;

import React from "react";
import { useState } from "react";
import TodoList from "./TodoList";


function TodoFilter({ filter, setFilter}) {
    return (
          <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "ALL"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("ACTIVE")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "ACTIVE"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setFilter("COMPLETED")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "COMPLETED"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Completed
          </button>
        </div>
    );
}

export default TodoFilter;



import React from "react";
import { useState } from "react";



function TodoSearch({searchTerm, setSearchTerm, loadTodos }){
    return(
        <div className="absolute top-8 right-8 flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} //updates react values
            onKeyDown={(e) => {
            if (e.key === "Enter") loadTodos();;
            }}
            placeholder="Search for a todo"
            className="w-64 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() =>loadTodos()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>

          <button
            onClick={() => {
            setSearchTerm("");
            }}
             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Clear

          </button>
      </div>
    )
    
}
export default TodoSearch;

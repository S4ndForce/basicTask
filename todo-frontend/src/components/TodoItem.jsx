import React, { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(todo.description);

  const handleBlur = () => {
    const trimmed = editedDesc.trim();
    if (trimmed === "") {
      onDelete(todo.id);
    } else {
      onUpdate(todo.id, { ...todo, description: trimmed });
    }
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="mr-3 w-5 h-5 text-blue-500"
        />

        {isEditing ? (
          <input
            type="text"
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && handleBlur()}
            className="flex-grow border-b border-gray-400 focus:outline-none bg-transparent"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow text-gray-800 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.description}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 font-semibold transition"
        >
          Delete
        </button>

        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            todo.priority === "HIGH"
              ? "bg-red-100 text-red-600"
              : todo.priority === "MEDIUM"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {todo.priority}
        </span>
      </div>
    </li>
  );
}

export default TodoItem;

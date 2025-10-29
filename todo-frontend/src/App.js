import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const updateTodo = async (todo) => {
    await axios.put(`http://localhost:8081/api/todos/${todo.id}`, {
      description: todo.description,
      completed: todo.completed,
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  //get button
  const fetchTodos = async () => {
  const res = await axios.get("http://localhost:8081/api/todos");
  setTodos(res.data.map((t) => ({ ...t, isEditing: false })));
};

  //get addTodo
  const [priority, setPriority] = useState("LOW");
  const [category, setCategory] = useState("General");

  const addTodo = async () => {
    if (!newTodo.trim()) return;
        await axios.post("http://localhost:8081/api/todos", {
          description: newTodo,
          completed: false,
          category,
          priority,
        });
    setNewTodo("");
    setCategory("General");
    setPriority("LOW");
    fetchTodos();
  };

  //delete item
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8081/api/todos/${id}`);
    fetchTodos();
  };

  //change to-do item
  const toggleTodo = async (id, completed) => {
    const todo = todos.find((t) => t.id === id);
    await axios.put(`http://localhost:8081/api/todos/${id}`, {
      ...todo,
      completed,
    });
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My To-do List
        </h1>

        <div className="flex mb-4 space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="Enter a new task"
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          id="priority"
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-2"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <select
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-2"
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Fitness">Fitness</option>
        </select>

        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
</div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm"
            >
              <div className="flex items-center flex-grow">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, !todo.completed)}
                  className="mr-3 w-5 h-5 text-blue-500"
                />

                {todo.isEditing ? (
                 <input
                      type="text"
                      value={todo.description}
                      onChange={(e) =>
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, description: e.target.value } : t
                          )
                        )
                      }
                      onBlur={(e) => {
                        const currentValue = e.target.value.trim();

                        // update React state immediately
                        setTodos(
                          todos.map((t) =>
                            t.id === todo.id ? { ...t, description: currentValue } : t
                          )
                        );

                        // then act based on the actual input value
                        if (currentValue === "") {
                          deleteTodo(todo.id);
                        } else {
                          updateTodo({
                            ...todo,
                            description: currentValue,
                          });
                        }

                        // finally close edit mode
                        setTodos((prev) =>
                          prev.map((t) => ({ ...t, isEditing: false }))
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const currentValue = e.target.value.trim();

                          if (currentValue === "") {
                            deleteTodo(todo.id);
                          } else {
                            updateTodo({
                              ...todo,
                              description: currentValue,
                            });
                          }

                          setTodos((prev) =>
                            prev.map((t) => ({ ...t, isEditing: false }))
                          );
                        } else if (e.key === "Escape") {
                          setTodos((prev) =>
                            prev.map((t) => ({ ...t, isEditing: false }))
                          );
                        }
                      }}
                      className="flex-grow border-b border-gray-400 focus:outline-none bg-transparent"
                      autoFocus
                      />

                    
                  
                ) : (
                  
                  <span
                    className={`flex-grow text-gray-800 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                    onDoubleClick={() =>
                      setTodos(
                        todos.map((t) =>
                          t.id === todo.id
                            ? { ...t, isEditing: true }
                            : t
                        )
                      )
                    }
                  >
                    {todo.description}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => deleteTodo(todo.id)}
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
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

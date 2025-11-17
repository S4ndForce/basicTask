import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onUpdate, }) {

return(
    <ul className="space-y-3">
        {todos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo ={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
               
            />
        


        ))}
    </ul>
    );


}

export default TodoList;
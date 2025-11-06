//controls axios features

import axios from "axios";
const API_URL =  "http://localhost:8081/api/todos";




export const updateTodo = (id, todo) => {
    return axios.put(`${API_URL}/${id}`, todo);
};

export const toggleTodo = async (id, todo) => {
    return axios.put(`${API_URL}/${id}`, todo);
   
};

export const fetchTodos = (search = "", sort = false) => {
    return axios.get(`${API_URL}?search=${search}&sortByPriority=${sort}`);
};

export const addTodo = (todo) =>{
    return axios.post(API_URL, todo);
};


export const deleteTodo = (id) =>{
    return axios.delete(`${API_URL}/${id}`);
};


export const deleteCompleted = async (todos) => {
    const completed = todos.filter((t)=> t.completed);
    for(const todo of completed){
        await deleteTodo(todo.id);
    }
};


/*
const updateTodo = async (todo) => {
    await axios.put(`http://localhost:8081/api/todos/${todo.id}`, { //use axios everytime you want the app to remember something
      description: todo.description,
      completed: todo.completed,
      category: todo.category,
      priority: todo.priority,
    });
    fetchTodos(); //refreshes my todos from the back end everytime i update it on the front
  };

*/
   //get button
  

/*
export const searchTodo = async (term = searchTerm) =>{
  const res = await axios.get(`http://localhost:8081/api/todos?search=${searchTerm}`); //makes a GET request to filter the Todo items
  setTodos(res.data.map((t) => ({ ...t, isEditing: false }))); //closes the editing feature
}
*/


/*
 const addTodo = async () => {
    if (!newTodo.trim()) return;
        await axios.post("http://localhost:8081/api/todos", {
          description: newTodo,
          completed: false,
          category,
          priority,
        });
    setNewTodo("");
    fetchTodos();
  };
*/


/*


 const deleteTodo = async (id) => { // delete the function when deleteTodo is called, wrapped in a function, await and async just wiat to get a response
    await axios.delete(`http://localhost:8081/api/todos/${id}`);
    fetchTodos();
  };

*/



/*
   const deleteCompleted = async (id) => {
      const completedTodos = todos.filter(t => t.completed); //completes code based on filters
      for(const todo of completedTodos){
        await axios.delete(`http://localhost:8081/api/todos/${todo.id}`);
      }
      fetchTodos();
  }
*/


  //change to-do item
  /*
  export const toggleTodo = async (id, completed) => {
    const todo = todos.find((t) => t.id === id); //finds the todo to checkmark
    await axios.put(`http://localhost:8081/api/todos/${id}`, { //await feature makes sure the backend actually updates before moving on
      ...todo,
      completed,
    });
    fetchTodos();
  };
  */
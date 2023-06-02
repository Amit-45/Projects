import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);

      // Check if the edited todo is not an empty string or whitespace
      if (todo.trim() !== '') {
        const updatedTodos = todos.map((t) =>
          t.id === editTodo.id ? { id: t.id, task: todo } : t
        );
        setTodos(updatedTodos);
        setEditId(0);
        setTodo('');
      }

      return;
    }

    // Check if the new todo is not an empty string or whitespace
    if (todo.trim() !== '') {
      setTodos((prevTodos) => [
        { id: `${todo}-${Date.now()}`, task: todo },
        ...prevTodos,
      ]);
      setTodo('');
    }
  };



  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.task);
    setEditId(id);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>To Do List App</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <button type="submit">GO</button>
        </form>

        <ul className="allToDos">
          {todos.map((item) => (
            <li key={item.id}>
              <div className="task">
                <span>{item.task}</span>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
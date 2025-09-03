import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';
import { FiPlus, FiCalendar, FiTag, FiX } from 'react-icons/fi';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    text: '',
    dueDate: '',
    priority: 'medium',
    category: '',
    notes: ''
  });
  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.text.trim()) return;
    
    const todoToAdd = {
      ...newTodo,
      id: uuidv4(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTodos([...todos, todoToAdd]);
    
    // Reset form
    setNewTodo({
      text: '',
      dueDate: '',
      priority: 'medium',
      category: '',
      notes: ''
    });
    
    setShowAddForm(false);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMM d, yyyy');
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffb142';
      case 'low': return '#4cd137';
      default: return '#4a90e2';
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (todo.notes && todo.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'active') return !todo.completed && matchesSearch;
    if (filter === 'completed') return todo.completed && matchesSearch;
    return matchesSearch;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-app">
      <h1>To do List</h1>
      
      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="search-input"
        />
      </div>
      
      {/* Add Todo Form */}
      {showAddForm ? (
        <form onSubmit={addTodo} className="add-todo-form">
          <div className="form-group">
            <input
              type="text"
              value={newTodo.text}
              onChange={(e) => setNewTodo({...newTodo, text: e.target.value})}
              placeholder="What needs to be done?"
              className="form-input"
              autoFocus
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <div className="date-picker">
                <FiCalendar className="icon" />
                <input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Priority</label>
              <select
                value={newTodo.priority}
                onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <select
              value={newTodo.category}
              onChange={(e) => setNewTodo({...newTodo, category: e.target.value})}
              className="form-select"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <textarea
              value={newTodo.notes}
              onChange={(e) => setNewTodo({...newTodo, notes: e.target.value})}
              placeholder="Add notes..."
              className="form-textarea"
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Add Task
            </button>
          </div>
        </form>
      ) : (
        <button 
          className="add-todo-btn"
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus /> Add New Task
        </button>
      )}

      {/* Filters */}
      <div className="todo-filters">
        <button 
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        >
          Completed
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
            style={{ borderLeft: `4px solid ${getPriorityColor(todo.priority)}` }}
          >
            <div className="todo-item-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="todo-checkbox"
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
              />
              
              <div className="todo-details">
                <span className="todo-text">{todo.text}</span>
                
                <div className="todo-meta">
                  {todo.category && (
                    <span className="todo-category">
                      <FiTag size={12} /> {todo.category}
                    </span>
                  )}
                  
                  {todo.dueDate && (
                    <span className="todo-due-date">
                      <FiCalendar size={12} /> {formatDueDate(todo.dueDate)}
                    </span>
                  )}
                </div>
                
                {todo.notes && (
                  <div className="todo-notes">
                    {todo.notes}
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              className="delete-button"
              aria-label="Delete todo"
            >
              <FiX />
            </button>
          </li>
        ))}
        
        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <p>No tasks found. Add a new task to get started!</p>
          </div>
        )}
      </ul>

      <div className="todo-footer">
        <span>{activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left</span>
        {todos.some(todo => todo.completed) && (
          <button 
            onClick={clearCompleted}
            className="clear-button"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/todoHelpers'
import {partial, pipe} from './lib/utils'

class App extends React.Component {
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isCompleted: false},
      {id: 2, name: 'Buy milk', isCompleted: true},
      {id: 3, name: 'Build an awesome app', isCompleted: false},
    ],
    currentTodo: ''
  };

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({todos: updatedTodos});
  };

  handleInputChange = (e) => {
    this.setState({
      currentTodo: e.target.value,
      errorMessage: ''
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      name: this.state.currentTodo,
      id: generateId(),
      isCompleted: false
    };
    this.setState({
      todos: addTodo(this.state.todos, newTodo),
      currentTodo: ''
    });
  };

  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({errorMessage: 'Please supply a todo name'})
  };

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
  };

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <div className='app'>
        <div className='app_header'>
          <img src={logo} className='app_logo' alt='logo'/>
          <h2>React Todos</h2>
        </div>
        <div className='todo_app'>
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
                    handleSubmit={submitHandler}
                    currentTodo={this.state.currentTodo} />
          <TodoList todos={this.state.todos}
                    handleToggle={this.handleToggle}
                    handleRemove={this.handleRemove}/>
        </div>
      </div>
    );
  }
}

export default App;

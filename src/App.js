import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Filter} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {partial, pipe} from './lib/utils'
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService'

class App extends React.Component {
  state = {
    todos: [],
    currentTodo: ''
  };

  static contextTypes = {
    route: React.PropTypes.string
  };

  showTemporaryMessage = (message) => {
    this.setState({message});
    setTimeout(() => this.setState({message: ''}), 2000);
  };

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo);
    const toggledTodo = getToggledTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(toggledTodo);
    this.setState({todos: updatedTodos});
    saveTodo(toggledTodo)
      .then(() => this.showTemporaryMessage('Todo saved'));
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
    createTodo(newTodo)
      .then(() => this.showTemporaryMessage('Todo added'));
  };

  handleEmptySubmit = (e) => {
    e.preventDefault();
    this.setState({errorMessage: 'Please supply a todo name'})
  };

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
    destroyTodo(id)
      .then(() => this.showTemporaryMessage('Todo removed'));
  };

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}));
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className='app'>
        <div className='app_header'>
          <img src={logo} className='app_logo' alt='logo'/>
          <h2>React Todos</h2>
        </div>
        <div className='todo_app'>
          {this.state.errorMessage && <span className="message error">{this.state.errorMessage}</span>}
          {this.state.message && <span className="message success">{this.state.message}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
                    handleSubmit={submitHandler}
                    currentTodo={this.state.currentTodo} />
          <TodoList todos={displayTodos}
                    handleToggle={this.handleToggle}
                    handleRemove={this.handleRemove} />
          <Filter/>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <div className='app_header'>
          <img src={logo} className='app_logo' alt='logo' />
          <h2>React Todos</h2>
        </div>
        <div className='todo_app'>
          <form>
            <input className='new_todo_field' type='text' placeholder='Another brilliant idea?'/>
          </form>
          <div className='todo_list'>
            <ul>
              <li><input type='checkbox'/>Learn JSX</li>
              <li><input type='checkbox'/>Buy milk</li>
              <li><input type='checkbox'/>Build an awesome app</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

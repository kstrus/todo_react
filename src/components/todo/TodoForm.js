import React from 'react'

export const TodoForm = (props) => {
  return (
  <form onSubmit={props.handleSubmit}>
    <input className='new_todo_field' type='text' value={props.currentTodo} placeholder='Another brilliant idea?' onChange={props.handleInputChange}/>
  </form>
)};

TodoForm.propTypes = {
  handleInputChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  currentTodo: React.PropTypes.string
};
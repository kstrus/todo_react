import React from 'react'
import {partial} from '../../lib/utils'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id);
  //can replace this with:
  //const handleToggle = props.handleToggle.bind(null,props.id);
  const handleRemove = partial(props.handleRemove, props.id);
  //const handleRemove = props.handleRemove.bind(null, props.id);

  return (
    <li className="todo_item">
      <a href="#" className="remove_button" onClick={handleRemove}>X</a>
      <input type="checkbox" onChange={handleToggle} checked={props.isCompleted}/>{props.name}
    </li>
)};

TodoItem.propTypes = {
  isCompleted: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  handleToggle: React.PropTypes.func.isRequired,
  handleRemove: React.PropTypes.func.isRequired
};
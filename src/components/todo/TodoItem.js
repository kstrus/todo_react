import React from 'react'

export const TodoItem = (props) => {
  return (
  <li>
    <input type='checkbox' defaultChecked={props.isCompleted}/>{props.name}
  </li>
)};

TodoItem.propTypes = {
  isCompleted: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired
};
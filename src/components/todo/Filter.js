import React from 'react';
import {Link} from '../router';

export const Filter = () => {
  return (
    <div className="filter">
      <Link to="/">All</Link>
      <Link to="/active">Active</Link>
      <Link to="/completed">Completed</Link>
    </div>
  )
};
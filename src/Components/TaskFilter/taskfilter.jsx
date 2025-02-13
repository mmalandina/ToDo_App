import React from 'react';
import PropTypes from 'prop-types';
import './taskfilter.css';

function TasksFilter({ onFilterChange = () => {} }) {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => onFilterChange('All')}>All</button>
      </li>
      <li>
        <button onClick={() => onFilterChange('Active')}>Active</button>
      </li>
      <li>
        <button onClick={() => onFilterChange('Completed')}>Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default TasksFilter;

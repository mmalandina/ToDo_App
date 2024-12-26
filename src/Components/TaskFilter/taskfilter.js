import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './taskfilter.css'

TasksFilter.defaultProps = {
    onFilterChange: () => {}
  };
  
  TasksFilter.propTypes = {
    onFilterChange: PropTypes.func
  };

function TasksFilter({ onFilterChange }) {
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
  

export default TasksFilter;
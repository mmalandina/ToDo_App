import React from 'react';
import PropTypes from 'prop-types';
import './footer.css'

Footer.defaultProps = {
    count: 0,
    onFilterChange: () => {},
    clearCompleted: () => {},
  };
  
  Footer.propTypes = {
    count: PropTypes.number,
    onFilterChange: PropTypes.func,
    clearCompleted: PropTypes.func
  };

function Footer({ count, onFilterChange, clearCompleted }) {
    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TasksFilter onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
      </footer>
    );
  }
  
  export default Footer;
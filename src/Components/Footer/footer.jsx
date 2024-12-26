import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from "../TaskFilter";
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
        <TaskFilter onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
      </footer>
    );
  }
  
  export default Footer;
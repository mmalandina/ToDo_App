import React from "react";
import PropTypes from "prop-types";
import Task from "../Task";
import "./tasklist.css";

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};

function TaskList({ tasks, onDeleted, onToggleDone, onEditTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <Task
            {...task}
            onDeleted={() => onDeleted(task.id)}
            onToggleDone={() => onToggleDone(task.id)}
            onEditTask={onEditTask}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
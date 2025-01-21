import React from "react";
import PropTypes from "prop-types";
import Task from "../Task";
import "./tasklist.css";

function TaskList({
  tasks,
  onDeleted,
  onToggleDone,
  onEditTask,
  onToggleTimer,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <Task
            {...task}
            onDeleted={() => onDeleted(task.id)}
            onToggleDone={() => onToggleDone(task.id)}
            onEditTask={onEditTask}
            onToggleTimer={() => onToggleTimer(task.id)}
          />
        </li>
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditTask: () => {},
  onToggleTimer: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditTask: PropTypes.func,
  onToggleTimer: PropTypes.func,
};

export default TaskList;

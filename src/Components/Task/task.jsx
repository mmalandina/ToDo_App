import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

function Task({
  id,
  description,
  created,
  done,
  timer,
  isRunning,
  onDeleted,
  onToggleDone,
  onToggleTimer,
  onEditTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const onToggleEdit = () => {
    setIsEditing(true);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const onSubmit = () => {
    onEditTask(id, newDescription);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    } else if (e.key === 'Escape' && isEditing) {
      setIsEditing(false);
      setNewDescription(description);
    }
  };

  const distanceToNow = formatDistanceToNow(new Date(created), {
    includeSeconds: true,
  });

  let classNames = 'task';
  if (done) {
    classNames += ' done completed';
  }
  if (isEditing) {
    classNames += ' editing';
  }

  return (
    <div className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={onToggleDone}
        />
        <label>
          <span className="description" onClick={onToggleDone}>
            {description}
          </span>
          <span className="timer">
            <button
              className={`icon ${isRunning ? 'icon-pause' : 'icon-play'}`}
              onClick={() => onToggleTimer(id)}
            ></button>
            {formatTime(timer)}
          </span>
          <span className="created">created {distanceToNow} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={newDescription}
          onChange={handleDescriptionChange}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  done: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleTimer: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

export default Task;

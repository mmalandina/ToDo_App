import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './newtaskform.css';

function NewTaskForm({ onItemAdded }) {
  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onMinutesChange = (e) => {
    const value = e.target.value.replace(/\D/, '');
    if (value === '' || parseInt(value, 10) < 100) {
      setMinutes(value);
    }
  };

  const onSecondsChange = (e) => {
    const value = e.target.value.replace(/\D/, '');
    if (
      value === '' ||
      (parseInt(value, 10) >= 0 && parseInt(value, 10) < 60)
    ) {
      setSeconds(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const totalSeconds =
      parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10);

    if (description.trim() && totalSeconds >= 0) {
      onItemAdded(description, totalSeconds);
      setDescription('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <header className="header">
      <form className="new-task-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={description}
          onChange={onDescriptionChange}
          autoFocus
        />
        <input
          className="new-todo-timer"
          placeholder="Min"
          value={minutes}
          onChange={onMinutesChange}
          maxLength="2"
        />
        <input
          className="new-todo-timer"
          placeholder="Sec"
          value={seconds}
          onChange={onSecondsChange}
          maxLength="2"
        />
        <button type="submit">Add</button>
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;

import React, { Component } from "react";
import PropTypes from "prop-types";
import "./newtaskform.css";

export default class NewTaskForm extends Component {
  state = {
    description: "",
    minutes: "",
    seconds: "",
  };

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  onMinutesChange = (e) => {
    const value = e.target.value.replace(/\D/, "");
    if (value === "" || parseInt(value, 10) < 100) {
      this.setState({ minutes: value });
    }
  };

  onSecondsChange = (e) => {
    const value = e.target.value.replace(/\D/, "");
    if (
      value === "" ||
      (parseInt(value, 10) >= 0 && parseInt(value, 10) < 60)
    ) {
      this.setState({ seconds: value });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { description, minutes, seconds } = this.state;

    const totalSeconds =
      parseInt(minutes || "0", 10) * 60 + parseInt(seconds || "0", 10);

    if (description.trim() && totalSeconds >= 0) {
      this.props.onItemAdded(description, totalSeconds);
      this.setState({ description: "", minutes: "", seconds: "" });
    }
  };

  render() {
    const { description, minutes, seconds } = this.state;

    return (
      <header className="header">
        <form className="new-task-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={description}
            onChange={this.onDescriptionChange}
            autoFocus
          />
          <input
            className="new-todo-timer"
            placeholder="Min"
            value={minutes}
            onChange={this.onMinutesChange}
            maxLength="2"
          />
          <input
            className="new-todo-timer"
            placeholder="Sec"
            value={seconds}
            onChange={this.onSecondsChange}
            maxLength="2"
          />
          <button type="submit">Add</button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

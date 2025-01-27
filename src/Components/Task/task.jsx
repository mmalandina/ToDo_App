import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import "./task.css";

export default class Task extends Component {
  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newDescription: this.props.description,
    };
  }

  onToggleEdit = () => {
    this.setState({ isEditing: true });
  };

  onDescriptionChange = (e) => {
    this.setState({ newDescription: e.target.value });
  };

  onSubmit = () => {
    const { id, onEditTask } = this.props;
    const { newDescription } = this.state;
    onEditTask(id, newDescription);
    this.setState({ isEditing: false });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.onSubmit();
    } else if (e.key === "Escape" && this.state.isEditing) {
      this.setState({
        isEditing: false,
        newDescription: this.props.description,
      });
    }
  };

  render() {
    const {
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
    } = this.props;

    const { isEditing, newDescription } = this.state;

    const distanceToNow = formatDistanceToNow(new Date(created), {
      includeSeconds: true,
    });

    let classNames = "task";
    if (done) {
      classNames += " done completed";
    }
    if (isEditing) {
      classNames += " editing";
    }

    let input;

    if (isEditing) {
      input = (
        <input
          type="text"
          className="edit"
          value={newDescription}
          onChange={this.onDescriptionChange}
          onKeyDown={this.handleKeyDown}
        />
      );
    } else {
      input = null;
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
                className={`icon ${isRunning ? "icon-pause" : "icon-play"}`}
                onClick={() => onToggleTimer(id)}
              ></button>
              {this.formatTime(timer)}
            </span>
            <span className="created">created {distanceToNow} ago</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={this.onToggleEdit}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {input}
      </div>
    );
  }
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

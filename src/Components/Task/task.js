import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import "./task.css";

export default class Task extends Component {
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
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.description !== this.props.description) {
      this.setState({ newDescription: this.props.description });
    }
  }

  render() {
    const { description, created, onDeleted, onToggleDone, done } = this.props;
    const { isEditing, newDescription } = this.state;

    const distanceToNow = formatDistanceToNow(new Date(created), {
      includeSeconds: true,
    });

    let classNames = "task";
    if (done) {
      classNames += " done";
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
            <span className="created">created {distanceToNow} ago</span>
            <button
              className="icon icon-edit"
              onClick={this.onToggleEdit}
            ></button>
          </label>
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
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};
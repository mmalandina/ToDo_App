import React, { Component } from "react";
import PropTypes from "prop-types";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import "./app.css";

export default class App extends Component {
  currentId = 0;

  state = {
    tasks: [
      this.createTodoItem("Task 1"),
      this.createTodoItem("Task 2"),
      this.createTodoItem("Task 3"),
    ],
    filter: "All",
  };

  createTodoItem(text) {
    return {
      id: this.currentId++,
      description: text,
      created: new Date(),
      done: false,
      timer: 0,
      isRunning: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const taskToDelete = tasks.find((task) => task.id === id);
      if (taskToDelete?.timerInterval) {
        clearInterval(taskToDelete.timerInterval);
      }
      const newArray = tasks.filter((task) => task.id !== id);
      return { tasks: newArray };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem];
      return { tasks: newArray };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [
        ...tasks.slice(0, idx),
        newItem,
        ...tasks.slice(idx + 1),
      ];
      return { tasks: newArray };
    });
  };

  onEditTask = (id, newDescription) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      const updatedItem = { ...oldItem, description: newDescription };
      const newArray = [
        ...tasks.slice(0, idx),
        updatedItem,
        ...tasks.slice(idx + 1),
      ];
      return { tasks: newArray };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const filteredTasks = tasks.filter((task) => !task.done);
      return { tasks: filteredTasks };
    });
  };

  toggleTimer = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((task) => task.id === id);
      const task = tasks[idx];
      if (task.isRunning) {
        clearInterval(task.timerInterval);
      } else {
        task.timerInterval = setInterval(() => {
          this.incrementTimer(id);
        }, 1000);
      }
      const updatedTask = { ...task, isRunning: !task.isRunning };
      const newArray = [
        ...tasks.slice(0, idx),
        updatedTask,
        ...tasks.slice(idx + 1),
      ];
      return { tasks: newArray };
    });
  };

  incrementTimer = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((task) => task.id === id);
      const task = tasks[idx];
      const updatedTask = { ...task, timer: task.timer + 1 };
      const newArray = [
        ...tasks.slice(0, idx),
        updatedTask,
        ...tasks.slice(idx + 1),
      ];
      return { tasks: newArray };
    });
  };

  render() {
    const { tasks, filter, isEditing, newDescription } = this.state;
    const todoCount = tasks.filter((task) => !task.done).length;
    const visibleTasks = tasks.filter((task) => {
      if (filter === "All") return true;
      if (filter === "Active") return !task.done;
      if (filter === "Completed") return task.done;
      return true;
    });

    return (
      <section className="todoapp">
        <h1>TODOs</h1>
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditTask={this.onEditTask}
            onToggleTimer={this.toggleTimer}
          />
          <Footer
            count={todoCount}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

App.defaultProps = {
  tasks: [],
  filter: "All",
};

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
};

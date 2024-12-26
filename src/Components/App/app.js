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
    };
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
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

  render() {
    const { tasks, filter } = this.state;
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

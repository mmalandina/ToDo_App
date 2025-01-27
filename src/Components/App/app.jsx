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
      this.createTodoItem("Task 1", 3600),
      this.createTodoItem("Task 2", 3600),
      this.createTodoItem("Task 3", 3600),
    ],
    filter: "All",
  };

  componentWillUnmount() {
    this.state.tasks.forEach((task) => {
      if (task.timerInterval) {
        clearInterval(task.timerInterval);
      }
    });
  }

  createTodoItem(text, timerSeconds) {
    return {
      id: this.currentId++,
      description: text,
      created: new Date(),
      done: false,
      timer: timerSeconds,
      isRunning: false,
      timerInterval: null,
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

  addItem = (description, timerSeconds) => {
    const newItem = this.createTodoItem(description, timerSeconds || 0);
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem],
    }));
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
      tasks.forEach((task) => {
        if (task.done && task.timerInterval) {
          clearInterval(task.timerInterval);
        }
      });
      
      const filteredTasks = tasks.filter((task) => !task.done);
      return { tasks: filteredTasks };
    });
  };

  updateTask = (id, updates) => {
    this.setState(({ tasks }) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );
      return { tasks: updatedTasks };
    });
  };

  startTimer = (id) => {
    const task = this.state.tasks.find((task) => task.id === id);
    if (!task || task.timerInterval) return;

    const timerInterval = setInterval(() => {
      this.setState(({ tasks }) => {
        const updatedTasks = tasks.map((t) => {
          if (t.id === id && t.timer > 0) {
            return { ...t, timer: t.timer - 1 };
          }
          if (t.id === id && t.timer <= 0) {
            clearInterval(t.timerInterval);
            return { ...t, timer: 0, isRunning: false, timerInterval: null };
          }
          return t;
        });
        return { tasks: updatedTasks };
      });
    }, 1000);

    this.updateTask(id, { timerInterval, isRunning: true });
  };

  stopTimer = (id) => {
    const task = this.state.tasks.find((task) => task.id === id);
    if (!task || !task.timerInterval) return;

    clearInterval(task.timerInterval);
    this.updateTask(id, { timerInterval: null, isRunning: false });
  };

  toggleTimer = (id) => {
    const task = this.state.tasks.find((task) => task.id === id);
    if (!task) return;

    if (task.isRunning) {
      this.stopTimer(id);
    } else {
      this.startTimer(id);
    }
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

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
};

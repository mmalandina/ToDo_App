import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './app.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    return [
      {
        id: 0,
        description: 'Task 1',
        created: new Date(),
        done: false,
        timer: 3600,
        isRunning: false,
        timerInterval: null,
      },
      {
        id: 1,
        description: 'Task 2',
        created: new Date(),
        done: false,
        timer: 3600,
        isRunning: false,
        timerInterval: null,
      },
      {
        id: 2,
        description: 'Task 3',
        created: new Date(),
        done: false,
        timer: 3600,
        isRunning: false,
        timerInterval: null,
      },
    ];
  });
  const [filter, setFilter] = useState('All');

  const currentId = useRef(3);

  const tasksRef = useRef(tasks);
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    return () => {
      tasksRef.current.forEach((task) => {
        if (task.timerInterval) {
          clearInterval(task.timerInterval);
        }
      });
    };
  }, []);

  const createTodoItem = (text, timerSeconds) => {
    const newTask = {
      id: currentId.current,
      description: text,
      created: new Date(),
      done: false,
      timer: timerSeconds,
      isRunning: false,
      timerInterval: null,
    };
    currentId.current += 1;
    return newTask;
  };

  const deleteItem = (id) => {
    setTasks((prevTasks) => {
      const taskToDelete = prevTasks.find((task) => task.id === id);
      if (taskToDelete?.timerInterval) {
        clearInterval(taskToDelete.timerInterval);
      }
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  const addItem = (description, timerSeconds) => {
    const newItem = createTodoItem(description, timerSeconds || 0);
    setTasks((prevTasks) => [...prevTasks, newItem]);
  };

  const onToggleDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const onEditTask = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => {
      prevTasks.forEach((task) => {
        if (task.done && task.timerInterval) {
          clearInterval(task.timerInterval);
        }
      });
      return prevTasks.filter((task) => !task.done);
    });
  };

  const updateTask = (id, updates) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const startTimer = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task || task.timerInterval) return;

    const intervalId = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((t) => {
          if (t.id === id) {
            if (t.timer > 0) {
              return { ...t, timer: t.timer - 1 };
            } else {
              clearInterval(intervalId);
              return { ...t, timer: 0, isRunning: false, timerInterval: null };
            }
          }
          return t;
        })
      );
    }, 1000);

    updateTask(id, { timerInterval: intervalId, isRunning: true });
  };

  const stopTimer = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task || !task.timerInterval) return;

    clearInterval(task.timerInterval);
    updateTask(id, { timerInterval: null, isRunning: false });
  };

  const toggleTimer = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    if (task.isRunning) {
      stopTimer(id);
    } else {
      startTimer(id);
    }
  };

  const todoCount = tasks.filter((task) => !task.done).length;
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.done;
    if (filter === 'Completed') return task.done;
    return true;
  });

  return (
    <section className="todoapp">
      <h1>TODOs</h1>
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          tasks={visibleTasks}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onEditTask={onEditTask}
          onToggleTimer={toggleTimer}
        />
        <Footer
          count={todoCount}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
};

export default App;

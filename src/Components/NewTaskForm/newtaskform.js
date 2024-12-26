import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './newtaskform.css'

export default class NewTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          description: '',
        };
      }
  
    onDescriptionChange = (e) => {
      this.setState({
        description: e.target.value
      })
    }
  
    onSubmit = (e) => {
      e.preventDefault();
      this.props.onItemAdded(this.state.description)
      this.setState({ description: '' });
  }
  
    render() {
      return (
        <header className="header">
          <form onSubmit={this.onSubmit}>
            <input className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus
            onChange={this.onDescriptionChange}
            value={this.state.description}
            />
          </form>
        </header>
      );
    }
  }

  NewTaskForm.defaultProps = {
    onItemAdded: () => {},
  };
  
  NewTaskForm.propTypes = {
    onItemAdded: PropTypes.func,
  };
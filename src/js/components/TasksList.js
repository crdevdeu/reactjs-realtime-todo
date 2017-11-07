import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import TaskForm from './common/TaskForm';
import TaskItem from './common/TaskItem';
import TaskListPagination from './common/TaskListPagination';

import environment from '../enviroment';

import './../../styles/main.scss';

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
  }

  editTask(taskId) {
    this.props.setTaskToEdit(taskId);
  }

  handleFormEdit(title, description, id) {
    this.props.onEditForm(title, description, id);
  }

  deleteTask(taskNumber) {
    this.props.onDeleteTask(taskNumber);
  }

  onPageChange(pageNumber) {
    this.props.handlePageChange(pageNumber);
  }

  render() {
    return (
      <div className="tasks-list">
        <div className="tasks-list-title">Tasks to do</div>
        { this.props.tasks.length === 0
          ? <div className="no-pending-tasks">You have 0 pending tasks</div> : null
        }
        <ListGroup>
          { this.props.tasks.map((task, index) => {
            return (
              <ListGroupItem key={index}>
                { this.props.taskToEditId !== task.id
                  ? <TaskItem
                    description={task.description}
                    id={task.id}
                    onDelete={this.deleteTask}
                    onEdit={this.editTask}
                    title={task.title}
                  />
                  : null
                }
                { this.props.taskToEditId === task.id
                  ? <TaskForm
                    description={task.description}
                    formTitle="Edit task"
                    handleFormSave={this.handleFormEdit}
                    id={task.id}
                    loading={this.props.editingTask}
                    title={task.title}
                  /> : null }
              </ListGroupItem>
            );
          }) }
        </ListGroup>
        {this.props.tasks.length > 0
          ? <TaskListPagination
            activePage={this.props.currentListPage}
            changePage={this.onPageChange}
            totalItems={
              Math.ceil(this.props.tasksTotal / environment.resultsPerPage)
            }
          />
          : null
        }
      </div>
    );
  }
}

TasksList.propTypes = {
  tasks: PropTypes.array,
  handlePageChange: PropTypes.func,
  tasksTotal: PropTypes.number,
  onEditForm: PropTypes.func,
  onDeleteTask: PropTypes.func,
  editingTask: PropTypes.bool,
  taskToEditId: PropTypes.string,
  setTaskToEdit: PropTypes.func,
  currentListPage: PropTypes.number
};

export default TasksList;

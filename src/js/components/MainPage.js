import React, { Component } from 'react';
import io from "socket.io-client";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/delay';

import Header from './common/Header';
import TaskForm from './common/TaskForm';
import TaskList from './TasksList';

import {
  getTasks,
  getTasksTotal,
  createTask,
  editTask,
  selectTaskToEdit,
  deleteTask
} from '../actions';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.createTask = this.createTask.bind(this);
    this.saveTaskEdit = this.saveTaskEdit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.taskUpdates$ = new BehaviorSubject();
    this.subscribeToSocketSubject = this.subscribeToSocketSubject.bind(this);
    this.unsubscribeFromSocketSubject = this.unsubscribeFromSocketSubject.bind(this);
  }

  componentDidMount() {
    this.props.getTasks(1);
    this.props.getTasksTotal();
    const socket = io.connect('http://localhost:9001');

    socket.on('taskUpdates', (data) => {
      this.taskUpdates$.next(data);
    });
    this.subscribeToSocketSubject();
  }

  componentWillReceiveProps(nextProps) {
    this.isLastItemOnPage(nextProps);
    this.isFinishedCreatingTask(nextProps);
    this.isFinishedEditingTask(nextProps);
    this.isFinishedDeletingTask(nextProps);
  }

  isLastItemOnPage(nextProps) {
    if (nextProps.tasks.length === 0 && this.props.currentPage > 1) {
      this.props.getTasks(this.props.currentPage - 1);
    }
  }

  isFinishedCreatingTask(nextProps) {
    return this.props.creatingTask && !nextProps.creatingTask
      ? this.subscribeToSocketSubject() : null;
  }

  isFinishedEditingTask(nextProps) {
    return this.props.editingTask && !nextProps.editingTask
      ? this.subscribeToSocketSubject() : null;
  }

  isFinishedDeletingTask(nextProps) {
    return this.props.deletingTask && !nextProps.deletingTask
      ? this.subscribeToSocketSubject() : null;
  }

  subscribeToSocketSubject() {
    this.taskUpdatedSubscription = this.taskUpdates$.delay(500).subscribe(() => {
      this.props.getTasks(this.props.currentPage);
      this.props.getTasksTotal();
    });
  }

  unsubscribeFromSocketSubject() {
    this.taskUpdatedSubscription.unsubscribe();
  }

  handlePageChange(pageNumber) {
    this.props.getTasks(pageNumber);
  }

  createTask(title, description) {
    this.unsubscribeFromSocketSubject();
    this.props.createTask(title, description);
  }

  editTask(taskId) {
    this.unsubscribeFromSocketSubject();
    this.props.selectTaskToEdit(taskId);
  }

  saveTaskEdit(title, description, id) {
    this.props.editTask(title, description, id);
  }

  deleteTask(taskId) {
    this.unsubscribeFromSocketSubject();
    this.props.deleteTask(taskId);
  }

  render() {
    return (
      <div className="main-page">
        <Header title="Todo app"/>
        <div className="tasks-container">
          <TaskForm
            description={''}
            formTitle="What needs to be done"
            handleFormSave={this.createTask}
            loading={this.props.creatingTask}
            title={''}
          />
          <TaskList
            currentListPage={this.props.currentPage}
            editingTask={this.props.editingTask}
            handlePageChange={this.handlePageChange}
            onDeleteTask={this.deleteTask}
            onEditForm={this.saveTaskEdit}
            setTaskToEdit={this.editTask}
            taskToEditId={this.props.taskToEdit}
            tasks={this.props.tasks}
            tasksTotal={this.props.tasksTotal}
          />
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  tasks: PropTypes.array,
  tasksTotal: PropTypes.number,
  getTasks: PropTypes.func,
  getTasksTotal: PropTypes.func,
  createTask: PropTypes.func,
  creatingTask: PropTypes.bool,
  editTask: PropTypes.func,
  editingTask: PropTypes.bool,
  deleteTask: PropTypes.func,
  selectTaskToEdit: PropTypes.func,
  taskToEdit: PropTypes.string,
  currentPage: PropTypes.number,
  deletingTask: PropTypes.bool
};

const mapStateToProps = ({ tasksState }) => {
  return {
    tasks: tasksState.tasks,
    tasksTotal: tasksState.tasksTotal,
    creatingTask: tasksState.creatingTask,
    editingTask: tasksState.editingTask,
    taskToEdit: tasksState.taskToEdit,
    currentPage: tasksState.currentPage,
    deletingTask: tasksState.deletingTask
  };
};

export default connect(mapStateToProps, {
  getTasks,
  getTasksTotal,
  createTask,
  editTask,
  deleteTask,
  selectTaskToEdit
})(MainPage);

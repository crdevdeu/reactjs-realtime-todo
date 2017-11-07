import axios from 'axios';

import {
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SELECT_TASK_TO_EDIT,
  TASK_CREATED,
  TASK_DELETED,
  TASK_EDITED,
  UPDATE_TASKS,
  UPDATE_TASKS_TOTAL
} from './types';

import environment from '../enviroment';

export const getTasks = (pageNumber) => {
  return (dispatch) => {
    axios.get(`${environment.serverUrl}/tasks?pageCount=${environment.resultsPerPage}&pageNumber=${pageNumber}`)
      .then((tasks) => {
        dispatch({
          type: UPDATE_TASKS,
          payload: tasks.data,
          currentPage: pageNumber
        });
      });
  };
};

export const getTasksTotal = () => {
  return (dispatch) => {
    axios.get(`${environment.serverUrl}/tasks/total`)
      .then((taskTotalResponse) => {
        dispatch({
          type: UPDATE_TASKS_TOTAL,
          payload: taskTotalResponse.data
        });
      });
  };
};

export const createTask = (title, description) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_TASK
    });

    axios.post(`${environment.serverUrl}/task/create`, {
      title,
      description
    }).then(() => {
      dispatch({
        type: TASK_CREATED
      });
    });
  };
};

export const selectTaskToEdit = (taskId) => {
  return {
    type: SELECT_TASK_TO_EDIT,
    payload: taskId
  };
};

export const editTask = (title, description, id) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_TASK
    });
    axios.put(`${environment.serverUrl}/task/update/${id}`, {
      title,
      description
    }).then(() => {
      dispatch({
        type: TASK_EDITED
      });
    });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TASK
    });

    axios.delete(`${environment.serverUrl}/task/delete/${id}`)
      .then(() => {
        dispatch({
          type: TASK_DELETED
        });
      });
  };
};

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
} from '../actions/types';

const INITIAL_STATE = {
  tasks: [],
  tasksTotal: 0,
  creatingTask: false,
  editingTask: false,
  deletingTask: false,
  taskToEdit: null,
  currentPage: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_TASKS:
      return { ...state, tasks: action.payload, currentPage: action.currentPage };
    case UPDATE_TASKS_TOTAL:
      return { ...state, tasksTotal: action.payload };
    case CREATE_TASK:
      return { ...state, creatingTask: true };
    case TASK_CREATED:
      return { ...state, creatingTask: false };
    case EDIT_TASK:
      return { ...state, editingTask: true };
    case SELECT_TASK_TO_EDIT:
      return { ...state, taskToEdit: action.payload };
    case TASK_EDITED:
      return { ...state, editingTask: false, taskToEdit: null };
    case DELETE_TASK:
      return { ...state, deletingTask: true };
    case TASK_DELETED:
      return { ...state, deletingTask: false };
    default:
      return state;
  }
};

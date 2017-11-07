import { combineReducers } from 'redux';
import TasksReducer from './TasksReducer';

export default combineReducers({
  tasksState: TasksReducer
});

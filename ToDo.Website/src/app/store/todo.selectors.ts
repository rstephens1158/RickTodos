import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducers';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectTodos = createSelector(
  selectTodoState,
  state => {
    return state.todos;
  }
);

export const selectAllLoading = createSelector(
  selectTodoState,
  state => state.loading
);

export const selectAllTodos = createSelector(
  selectTodoState,
  state => {
    return state.allTodos ;
  }
);

export const selectLoading = createSelector(
  selectTodoState,
  state => state.loading
);

export const selectError = createSelector(
  selectTodoState,
  state => state.error
);

// todo.reducer.ts
import {ActionReducerMap, createReducer, MetaReducer, on} from '@ngrx/store';
import {
  todosLoaded,
  loadTodosFailed,
  loadTodos,
  addTodo,
  todoAdded,
  allTodosLoaded,
  loadAllTodosFailed, loadAllTodos, todoCompleted
} from './todo.actions';
import {TodoModel} from "../models/todo.model";

export interface AppState {
  todos: TodoState;
}

export interface TodoState {
  todos: TodoModel[];
  allTodos: TodoModel[];
  loading: boolean;
  error: any;
}

export const initialState: TodoState = {
  todos: [],
  allTodos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodos, (state) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(todosLoaded, (state, {todos}) => {
    return {
      ...state,
      todos,
      loading: false,
      error: null
    };
  }),
  on(loadTodosFailed, (state, {error}) => {
    return {
      ...state,
      loading: false,
      error
    };
  }),

  on(allTodosLoaded, (state, {todos}) => {
    return {
      ...state,
      allTodos: todos,
      loading: false,
      error: null
    };
  }),
  on(loadAllTodosFailed, (state, {error}) => {
    return {
      ...state,
      loading: false,
      error
    };
  }),
  on(loadAllTodos, (state) => ({
    ...state,
    loading: true
  })),


  on(todoAdded, (state, todo: TodoModel) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
    error: null
  })),
  on(todoCompleted, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
    allTodos: state.allTodos.filter(todo => todo.id !== id),
    loading: false,
    error: null
  }))
);

export const reducers: ActionReducerMap<AppState> = {
  todos: todoReducer
};


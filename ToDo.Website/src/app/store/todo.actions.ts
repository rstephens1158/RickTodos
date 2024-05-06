import { createAction, props } from '@ngrx/store';
import { TodoModel } from '../models/todo.model';

export const loadTodos = createAction('[Todo] Load Todos');
export const todosLoaded = createAction('[Todo] Todos Loaded', props<{ todos: TodoModel[] }>());
export const loadTodosFailed = createAction('[Todo] Load Todos Failed', props<{ error: any }>());

export const loadAllTodos = createAction('[Todo] Load All Todos');
export const allTodosLoaded = createAction('[Todo] All Todos Loaded', props<{ todos: TodoModel[] }>());
export const loadAllTodosFailed = createAction('[Todo] Load All Todos Failed', props<{ error: any }>());

export const addTodo = createAction('[Todo] Add Todo',  props<{ title: string; description: string }>());
export const todoAdded = createAction('[Todo] Added',  props<TodoModel>());

export const completeTodo = createAction('[Todo] Complete Todo', props<{ id: string }>());
export const todoCompleted = createAction('[Todo] Completed', props<{ id: string }>());
export const completeTodoFailed = createAction('[Todo] Complete Todo Failed', props<{ error: any }>());

export const todoActions = {
  loadTodos,
  todosLoaded,
  loadTodosFailed,
  addTodo,
  todoAdded,
  loadAllTodos,
  allTodosLoaded,
  loadAllTodosFailed,
  completeTodo
};

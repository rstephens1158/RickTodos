import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {mergeMap, of, tap} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  loadTodos,
  todosLoaded,
  loadTodosFailed,
  addTodo,
  todoAdded,
  completeTodo,
  todoCompleted,
  completeTodoFailed, loadAllTodos, allTodosLoaded, loadAllTodosFailed
} from './todo.actions';
import {TodoService} from "../todo-data-service.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(loadTodos),
    switchMap(() =>
      this.todoService.getMyTodos().pipe(
        map(todos => todosLoaded({todos})),
        catchError(error => of(loadTodosFailed({error})))
      )
    )
  ));

  loadallTodos$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllTodos),
    switchMap(() =>
      this.todoService.getAllTodos().pipe(
        map(todos => allTodosLoaded({todos})),
        catchError(error => of(loadAllTodosFailed({error})))
      )
    )
  ));

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodo),
    mergeMap(action =>
      this.todoService.addTodo({title: action.title, description: action.description})
        .pipe(
          map(todo => todoAdded(todo)),
          catchError(error => of(loadTodosFailed({error})))
        )
    )
  ));

  completeTodo$ = createEffect(() => this.actions$.pipe(
    ofType(completeTodo),
    mergeMap(action =>
      this.todoService.completeTodo(action.id)
        .pipe(
          map(todo => todoCompleted({id: action.id})),
          catchError(error => of(completeTodoFailed({error})))
        )
    )
  ));

  todoCompleted$ = createEffect(() => this.actions$.pipe(
    ofType(todoCompleted),
    tap(() => {
      this.toastr.success('Todo item completed successfully!');
    })
  ), {dispatch: false});

  todoAdded$ = createEffect(() => this.actions$.pipe(
    ofType(todoAdded),
    tap(() => {
      this.toastr.success('Todo item Added successfully!');
    })
  ), {dispatch: false});
  constructor(private actions$: Actions, private todoService: TodoService, private toastr: ToastrService) {

  }
}

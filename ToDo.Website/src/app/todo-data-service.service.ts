import {Injectable, makeStateKey, StateKey, TransferState} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {TodoModel} from "./models/todo.model";
import {catchError} from "rxjs/operators";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiBaseUrl;
  private TODOS_KEY = makeStateKey<TodoModel[]>('todos');
  private ALLTODOS_KEY = makeStateKey<TodoModel[]>('alltodos');

  constructor(private http: HttpClient, private transferState: TransferState) {
  }

  getMyTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.apiUrl);
  }

  getAllTodos(): Observable<TodoModel[]> {
    const savedData: TodoModel[] | null = this.transferState.get<TodoModel[] | null>(this.ALLTODOS_KEY, null);
    if (savedData) {
      let sData =  of(savedData);
      this.transferState.remove(this.ALLTODOS_KEY);  // Clear the cache
      return sData;
      // If data exists, return it
    } else {
      return this.http.get<TodoModel[]>(this.apiUrl + '/all').pipe(
        tap(data => {
          this.transferState.set(this.ALLTODOS_KEY, data);  // Save data to state
        })
      );
    }
  }


  addTodo(todo: { title: string, description: string }): Observable<TodoModel> {
    return this.http.post<TodoModel>(this.apiUrl, todo)
      .pipe(
        catchError(error => {
          throw 'error in source. Details: ' + error;  //     Handle errors appropriately
        })
      );
  }

  completeTodo(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/complete`, {id})
      .pipe(
        catchError(error => {
          throw 'error in source. Details: ' + error;  //     Handle errors appropriately
        })
      );
  }
}

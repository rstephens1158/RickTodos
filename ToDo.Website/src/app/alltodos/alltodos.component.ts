import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {TodoModel} from "../models/todo.model";
import {selectAllTodos, selectError, selectLoading, selectTodos} from "../store/todo.selectors";
import {Store} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TodoitemComponent} from "../todoitem/todoitem.component";
import {CommonModule} from "@angular/common";
import {loadAllTodos} from "../store/todo.actions";

@Component({
  selector: 'app-alltodos',
  standalone: true,
  imports: [
    TodoitemComponent,
    CommonModule
  ],
  templateUrl: './alltodos.component.html',
  styleUrl: './alltodos.component.scss'
})
export class AlltodosComponent {
  public todos$: Observable<TodoModel[]>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
  }


  ngOnInit() {
    this.store.dispatch(loadAllTodos());
  }
}

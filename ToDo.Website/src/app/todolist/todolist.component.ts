import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {addTodo, loadTodos} from "../store/todo.actions";
import {selectError, selectLoading, selectTodos} from "../store/todo.selectors";
import {TodoModel} from "../models/todo.model";
import {TodoitemComponent} from "../todoitem/todoitem.component";
import {CommonModule, NgIf} from '@angular/common';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddTodoModalComponent} from "../add-todo-modal/add-todo-modal.component";

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    TodoitemComponent,
    CommonModule,
    NgIf

  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss'
})
export class TodoListComponent implements OnInit {
  todos$: Observable<TodoModel[]> = this.store.select(selectTodos);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<any> = this.store.select(selectError);


  constructor(private store: Store, private modalService: NgbModal) {

  }

  openAddDialog() {
    const modalRef = this.modalService.open(AddTodoModalComponent);
    modalRef.result.then((newTodo) => {
      if (newTodo) {
        this.store.dispatch(addTodo({
          title: newTodo.todoTitle,
          description: newTodo.todoDescription
        }));
      }
    }, (reason) => {
    });
  }

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }
}

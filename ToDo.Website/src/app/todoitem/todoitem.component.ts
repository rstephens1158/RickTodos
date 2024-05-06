import {Component, Input} from '@angular/core';
import {TodoModel} from "../models/todo.model";
import {Store} from "@ngrx/store";
import {NgIf} from "@angular/common";
import {completeTodo} from "../store/todo.actions";

@Component({
  selector: '[app-todoitem]',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './todoitem.component.html',
  styleUrl: './todoitem.component.scss'
})
export class TodoitemComponent {

  @Input() todo: TodoModel | undefined;

  @Input() canComplete: boolean = false;

  constructor(private store: Store) {

  }
  public completeTodo(id: string){
    this.store.dispatch(completeTodo({id}))
  }

}

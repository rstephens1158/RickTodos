import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-todo-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-todo-modal.component.html',
  styleUrl: './add-todo-modal.component.scss'
})
export class AddTodoModalComponent implements OnInit{
  public todoForm: FormGroup | undefined;
  constructor(public modal: NgbActiveModal, public fb: FormBuilder) {}

  public saveTodo(): void{
    this.modal.close(this.todoForm?.value);
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      todoTitle: ['', Validators.required],
      todoDescription: ['']
    });

  }


}

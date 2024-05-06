import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoitemComponent } from './todoitem.component';
import {Store} from "@ngrx/store";
import {completeTodo} from "../store/todo.actions";

class MockStore {
  dispatch = jasmine.createSpy('dispatch');
}
describe('TodoitemComponent', () => {
  let component: TodoitemComponent;
  let fixture: ComponentFixture<TodoitemComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = new MockStore();

    await TestBed.configureTestingModule({
      imports: [TodoitemComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to complete a todo', () => {
    const todoId = '123';
    component.completeTodo(todoId);
    expect(mockStore.dispatch).toHaveBeenCalledWith(completeTodo({ id: todoId }));
  });
});

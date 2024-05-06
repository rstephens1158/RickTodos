import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TodoListComponent } from './todolist.component';
import { TodoitemComponent } from '../todoitem/todoitem.component';  // Assuming TodoitemComponent is also used
import { loadTodos } from "../store/todo.actions";
import { selectError, selectLoading, selectTodos } from "../store/todo.selectors";

// Mock Store Setup
class MockStore {
  select = jasmine.createSpy().and.callFake((selector) => {
    switch (selector) {
      case selectTodos:
        return of([{ id: '1', title: 'Test Todo', description: 'Test', isComplete: false }]);
      case selectLoading:
        return of(false);
      case selectError:
        return of(null);
      default:
        return of([]);  // Default return value for any unmatched selectors
    }
  });
  dispatch = jasmine.createSpy('dispatch');
}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = new MockStore();

    await TestBed.configureTestingModule({
      imports: [TodoListComponent, TodoitemComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTodos on init', () => {
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadTodos());
  });

  it('should select todos from the store', () => {
    component.todos$.subscribe(todos => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('Test Todo');
    });
    expect(mockStore.select).toHaveBeenCalledWith(selectTodos);
  });

});

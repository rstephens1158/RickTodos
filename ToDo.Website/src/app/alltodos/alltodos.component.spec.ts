import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {BehaviorSubject, of} from 'rxjs';
import {AlltodosComponent} from './alltodos.component';
import {loadAllTodos} from '../store/todo.actions';
import {TodoModel} from '../models/todo.model';
import {selectAllTodos} from "../store/todo.selectors";

class MockStore {
  private mockTodos = new BehaviorSubject<TodoModel[]>([]);

  select = jasmine.createSpy().and.callFake((selector) => {
    if (selector === selectAllTodos) {
      return this.mockTodos.asObservable();
    }
    return of(null);
  });

  dispatch = jasmine.createSpy('dispatch');

  setMockTodos(todos: TodoModel[]) {
    this.mockTodos.next(todos);
  }
}

describe('AlltodosComponent', () => {
  let component: AlltodosComponent;
  let fixture: ComponentFixture<AlltodosComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = new MockStore();

    await TestBed.configureTestingModule({
      imports: [AlltodosComponent],
      providers: [
        {provide: Store, useValue: mockStore}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlltodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadAllTodos action on ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadAllTodos());
  });

  it('should render todos correctly', () => {
    const todos: TodoModel[] = [
      {id: '1', title: 'Todo 1', description: 'Description 1', isComplete: false},
      {id: '2', title: 'Todo 2', description: 'Description 2', isComplete: true}
    ];
    mockStore.setMockTodos(todos);
    fixture.detectChanges();

    const todoElements = fixture.nativeElement.querySelectorAll('.todo-item');
    expect(todoElements.length).toBe(todos.length);

    todoElements.forEach((element: HTMLElement, index: number) => {
      expect(element.textContent).toContain(todos[index].title);
      expect(element.textContent).toContain(todos[index].description);
    });
  });
});

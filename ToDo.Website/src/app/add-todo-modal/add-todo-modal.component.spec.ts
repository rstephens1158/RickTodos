import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTodoModalComponent } from './add-todo-modal.component';

describe('AddTodoModalComponent', () => {
  let component: AddTodoModalComponent;
  let fixture: ComponentFixture<AddTodoModalComponent>;
  let modalService: NgbActiveModal;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('NgbActiveModal', ['close']);

    await TestBed.configureTestingModule({
      imports: [ NgbModule, ReactiveFormsModule, AddTodoModalComponent ],
      providers: [
        { provide: NgbActiveModal, useValue: modalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save todo and close modal', () => {
    const todoData = { todoTitle: 'Test Title', todoDescription: 'Test Description' };
    component.todoForm = component.fb.group({
      todoTitle: [todoData.todoTitle],
      todoDescription: [todoData.todoDescription]
    });

    component.saveTodo();

    expect(modalService.close).toHaveBeenCalledWith(todoData);
  });
});

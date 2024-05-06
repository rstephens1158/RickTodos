import { TestBed } from '@angular/core/testing';
import { TodoService } from "./todo-data-service.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoDataServiceService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule
      providers: [TodoService] // Explicitly provide your service if not provided in root
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

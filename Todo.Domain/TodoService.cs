using Microsoft.Extensions.Logging;
using Todo.Common;

namespace Todo.Domain;

public class TodoService : ITodoService
{
    private readonly IGenericRepository<Todo> _todoRepository;
    private readonly ILogger<TodoService> _logger;

    public TodoService(IGenericRepository<Todo> todoRepository, ILogger<TodoService> logger)
    {
        _todoRepository = todoRepository;
        _logger = logger;
    }

    public Task<Todo> Create(string title, string description, string userId)
    {
        var newTodo = new Todo(title, description, false, userId);
        _todoRepository.Add(newTodo);

        return Task.FromResult(newTodo);
    }

    public async Task UpdateTodo(Guid id, string title, string description)
    {
        var todo = await _todoRepository.GetAsync(id);

        todo.Update(title, description);
        todo.Update(title, description);
    }

    public async Task Complete(Guid id)
    {
        var todo = await _todoRepository.GetAsync(id);

        todo.MarkComplete();
    }
}
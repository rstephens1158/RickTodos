namespace Todo.Domain;

public interface ITodoService
{
    Task<Todo> Create(string title, string description, string userId);
    Task UpdateTodo(Guid id, string title, string description);
    Task Complete(Guid id);
}           
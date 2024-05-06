namespace Todo.Contracts;

public class UpdateTodoRequest
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}
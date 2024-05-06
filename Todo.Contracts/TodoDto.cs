namespace Todo.Contracts;

public class TodoDto
{
    public Guid Id { get; set; }
    public string Description { get; set; }
    public bool IsComplete { get; set; }

    public string Title { get;  set; }
    
    public string UserId { get; set; }
}
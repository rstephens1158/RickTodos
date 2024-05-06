namespace Todo.Contracts;

public class CreateTodoRequest : ApiRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
}
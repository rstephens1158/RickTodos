namespace Todo.Contracts;

public class CompleteTodoRequest : ApiRequest
{
    public Guid Id { get; set; }
}
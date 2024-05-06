namespace Todo.Domain;

public class TodoInvariantException : InvariantException
{
    public TodoInvariantException(string code, string message) : base(code, message)
    {
    }
}
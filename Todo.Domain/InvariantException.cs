namespace Todo.Domain;

public abstract class InvariantException : Exception
{
    public string Code { get; }

    protected InvariantException(string code, string message) : base(message)
    {
        Code = code;
    }
}
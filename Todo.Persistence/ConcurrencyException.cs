namespace Todo.Persistence;

public class ConcurrencyException : Exception
{
    public ConcurrencyException(string aConcurrencyErrorOccurred) : base(aConcurrencyErrorOccurred)
    {
    }
}
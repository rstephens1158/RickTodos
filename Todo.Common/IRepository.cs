namespace Todo.Common;

public interface IRepository
{
    Task SaveChangesAsync(IMessageSession messageSession);
    Task SaveChangesAsync(IMessageHandlerContext context);
    
    bool HasChanges { get; }
}
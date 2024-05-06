using Todo.Common;

namespace Todo.Persistence;

public interface IUnitOfWork
{
    Task SaveChangesAsync(IMessageSession messageSession);
    Task SaveChangesAsync(IMessageHandlerContext context);
    void RegisterRepository<T>(IGenericRepository<T> repository) where T : BaseEntity;

}
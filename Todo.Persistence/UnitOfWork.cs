using Todo.Common;

namespace Todo.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly List<IRepository> _repositories = new();

    public UnitOfWork()
    {
    }

    public void RegisterRepository<T>(IGenericRepository<T> repository) where T : BaseEntity
    {
        _repositories.Add(repository);
    }

    public async Task SaveChangesAsync(IMessageSession messageSession)
    {
        if (_repositories.Count(x => x.HasChanges) > 1)
            throw new Exception("More than one repository has changes. This is not allowed.");
        
        foreach (var repo in _repositories)
        {
            await repo.SaveChangesAsync(messageSession);
        }
    }

    public async Task SaveChangesAsync(IMessageHandlerContext context)
    {
        if (_repositories.Count(x => x.HasChanges) > 1)
            throw new Exception("More than one repository has changes. This is not allowed.");

        foreach (var repo in _repositories)
        {
            await repo.SaveChangesAsync(context);
        }
    }
}
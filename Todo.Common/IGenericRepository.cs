using System.Linq.Expressions;

namespace Todo.Common;

public interface IGenericRepository<T> : IRepository where T : BaseEntity
{
    public Task<T> GetAsync(Guid id);
    public void Add(T entity);
    public void Update(T entity);

    Task<List<T>> GetItemsAsync(Expression<Func<T, bool>> predicate);


}
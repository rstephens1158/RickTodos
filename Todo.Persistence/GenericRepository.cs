using System.Linq.Expressions;
using MongoDB.Driver;
using Todo.Common;

namespace Todo.Persistence;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    protected readonly IMongoCollection<T> Collection;
    protected readonly List<T> TrackedEntities = new();

    public GenericRepository(IMongoClient mongoClient, string databaseName, string collectionName,
        IUnitOfWork unitOfWork)
    {
        var database = mongoClient.GetDatabase(databaseName);
        Collection = database.GetCollection<T>(collectionName);
        unitOfWork.RegisterRepository(this);
    }

    public async Task<T> GetAsync(Guid id)
    {
        try
        {
            if (TrackedEntities.Any(x => x.Id == id))
                return TrackedEntities.First(x => x.Id == id);

            var entity = await Collection.Find(Builders<T>.Filter.Eq("_id", id)).FirstOrDefaultAsync();
            if (entity != null)
            {
                TrackedEntities.Add(entity);
            }

            return entity;
        }
        catch (MongoException)
        {
            return null;
        }
    }

    public async Task<List<T>> GetItemsAsync(Expression<Func<T, bool>> predicate)
    {
        var compiledPredicate = predicate.Compile();
        var trackedMatches = TrackedEntities.Where(compiledPredicate).ToList();
        var results = new List<T>(trackedMatches);

        await Collection.Find(predicate).ForEachAsync(item =>
        {
            if (!trackedMatches.Contains(item))
            {
                results.Add(item);
                TrackedEntities.Add(item);
            }
        });

        return results;
    }

    public void Add(T entity)
    {
        TrackedEntities.Add(entity);
    }

    public void Update(T entity)
    {

        TrackedEntities.Add(entity);
    }

    public async Task SaveChangesAsync(IMessageSession messageSession)
    {
        
        // TODO, Transaction handling
        foreach (var entity in TrackedEntities.Where(x => x.Events.Any()))
        {
            var filter = Builders<T>.Filter.And(
                Builders<T>.Filter.Eq("_id", entity.Id),
                Builders<T>.Filter.Eq("version", entity.Version - 1));
            var update = Builders<T>.Update.Set(x => x.Version, entity.Version);

            var options = new ReplaceOptions { IsUpsert = true }; // Allow upsert
            var result = await Collection.ReplaceOneAsync(filter, entity, options);

            foreach (var domainEvent in entity.Events)
            {
                await messageSession?.Publish(domainEvent);
            }
            entity.Events.Clear();
        }

        TrackedEntities.Clear();
    }

    public async Task SaveChangesAsync(IMessageHandlerContext context)
    {
        // TODO, Transaction handling
        foreach (var entity in TrackedEntities.Where(x => x.Events.Any()))
        {
            var filter = Builders<T>.Filter.And(
                Builders<T>.Filter.Eq("_id", entity.Id),
                Builders<T>.Filter.Eq("version", entity.Version - 1));
            var options = new ReplaceOptions { IsUpsert = true }; // Allow upsert
            var result = await Collection.ReplaceOneAsync(filter, entity, options, context.CancellationToken);

            foreach (var domainEvent in entity.Events)
            {
                await context?.Publish(domainEvent)!;
            }
            entity.Events.Clear();
        }

        TrackedEntities.Clear();
    }

    public bool HasChanges
    {
        get
        {
            return TrackedEntities.Any(x => x.Events.Any());
        }
    }
}
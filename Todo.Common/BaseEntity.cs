using System.Text.Json.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace Todo.Common;

public abstract class BaseEntity : IEquatable<BaseEntity>
{
    [BsonId] public Guid Id { get; protected set; }

    [BsonElement("version")] public int Version { get; private set; }

    [BsonIgnore] public List<IDomainEvent> Events { get; private set; } = new();

    protected void Publish(IDomainEvent @event)
    {
        IncrementVersion();
        Events.Add(@event);
    }

    public void IncrementVersion()
    {
        Version++;
    }

    public override bool Equals(object obj)
    {
        return Equals(obj as BaseEntity);
    }

    public bool Equals(BaseEntity other)
    {
        if (other == null)
            return false;

        return Id == other.Id;
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
}
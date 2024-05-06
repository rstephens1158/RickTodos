using Todo.Common;

namespace Todo.Domain;

public class TodoCompletedEvent : IDomainEvent
{
    public Guid Id { get; set; }
    public DateTime CompletedAt { get; set; }
}
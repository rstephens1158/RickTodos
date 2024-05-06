    using Todo.Common;

namespace Todo.Domain;

public class TodoUpdatedEvent : IDomainEvent
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}
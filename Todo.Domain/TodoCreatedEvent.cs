using Todo.Common;

namespace Todo.Domain;

public class TodoCreatedEvent : IDomainEvent            
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsComplete { get; set; }

    public TodoCreatedEvent()
    {
    }
}
using System.Runtime.InteropServices.JavaScript;
using Todo.Common;

namespace Todo.Domain;

public class Todo : BaseEntity
{
    [Obsolete("Only for serialization. Do not use in code.", false)]
    public Todo()
    {
    }

    public Todo(string title, string description, bool isComplete, string userId)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new TodoInvariantException(TodoExceptionCodes.TodoTitleCannotBeEmpty, "Title cannot be null");

        if (string.IsNullOrWhiteSpace(description))
            throw new TodoInvariantException(TodoExceptionCodes.TodoDescriptionCannotBeEmpty, "Description cannot be null");
        
        if (string.IsNullOrWhiteSpace(userId))
            throw new TodoInvariantException(TodoExceptionCodes.TodoUserCannotBeEmpty, "User cannot be null");

        Id = Guid.NewGuid();


        Title = title;
        Description = description;
        IsComplete = isComplete;
        UserId = userId;

        Publish(new TodoCreatedEvent()
        {
            Id = Id,
            Title = Title,
            Description = Description,
            IsComplete = IsComplete
        });
    }

    public string UserId { get; private set; }
    public string Description { get; private set; }
    public bool IsComplete { get; private set; }

    public DateTime? CompletedAt { get; private set; }

    public string Title { get; private set; }

    public void MarkComplete()
    {
        IsComplete = true;
        CompletedAt = DateTime.UtcNow;

        Publish(new TodoCompletedEvent()
        {
            Id = Id,
            CompletedAt = CompletedAt.Value
        });
    }

    public void Update(string title, string description)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new TodoInvariantException(TodoExceptionCodes.TodoTitleCannotBeEmpty, "Title cannot be null");

        if (string.IsNullOrWhiteSpace(description))
            throw new TodoInvariantException(TodoExceptionCodes.TodoDescriptionCannotBeEmpty, "Description cannot be null");

        Title = title;
        Description = description;

        Publish(new TodoUpdatedEvent()
        {
            Id = Id,
            Title = Title,
            Description = Description
        });
    }
}
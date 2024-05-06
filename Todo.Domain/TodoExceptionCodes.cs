namespace Todo.Domain;

public static class TodoExceptionCodes
{
    public const string TodoTitleCannotBeEmpty = "todo_title_cannot_be_empty";
    public const string TodoDescriptionCannotBeEmpty = "todo_description_cannot_be_empty";
    public const string TodoUserCannotBeEmpty = "todo_user_cannot_be_empty";
    public const string InternalServerErrorCode = "internal_server_error";
    public const string InternalServerError = "There was an internal server error. Please try again later.";
}
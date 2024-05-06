namespace ToDo.Backend.Code;

public static class UseUowMiddlewareExtensions
{
    public static IApplicationBuilder UseUowMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<UowMiddleware>();
    }
}
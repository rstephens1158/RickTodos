using Todo.Contracts;
using Todo.Domain;

namespace ToDo.Backend.Code;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, ILogger<ExceptionHandlingMiddleware> logger)
    {
        try
        {
            await _next(context);
        }
        catch (InvariantException ex)
        {
            logger.LogWarning("Invariant Exception: {Message}", ex.Message);
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/json";
            var errorResponse = new ErrorResponse { Message = ex.Message, ErrorCode = ex.Code };
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
        catch (Exception ex)
        {
            logger.LogError(ex.ToString());
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";
            var errorResponse = new ErrorResponse
            {
                Message = TodoExceptionCodes.InternalServerError, ErrorCode = TodoExceptionCodes.InternalServerErrorCode
            };
            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    }
}


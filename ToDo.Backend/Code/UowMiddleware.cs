using NServiceBus;
using Todo.Persistence;

namespace ToDo.Backend.Code
{
    public class UowMiddleware
    {
        private readonly RequestDelegate _next;

        public UowMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IUnitOfWork unitOfWork,  ILogger<UowMiddleware> logger, IMessageSession messageSession)
        {
            try
            {
                // Call the next middleware (possibly MVC action)
                await _next(context);

                // Check if the response is successful and no exception occurred
                if (context.Response.StatusCode == StatusCodes.Status200OK)
                {
                    // If yes, commit the changes
                    await unitOfWork.SaveChangesAsync(messageSession);
                }
            }
            catch (Exception e)
            {
                logger.LogError(e, "Error in UowMiddleware");
                throw;
            }
        }
    }
}
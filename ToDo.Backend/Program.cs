using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using Newtonsoft.Json;
using NServiceBus;
using ToDo.Backend;
using ToDo.Backend.Code;
using Todo.Common;
using Todo.Domain;
using Todo.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
    options.Audience = builder.Configuration["Auth0:Audience"];
   
});

builder.Host.UseNServiceBus(context =>
{
    var endpointConfiguration = new EndpointConfiguration("ToDo.Backend");
    var serialization = endpointConfiguration.UseSerialization<NewtonsoftJsonSerializer>();
    serialization.Settings(new JsonSerializerSettings()
    {
        DateTimeZoneHandling = DateTimeZoneHandling.Utc
    });

    var transport = endpointConfiguration.UseTransport<AzureServiceBusTransport>();
    transport.ConnectionString(builder.Configuration["servicebusConnection"]);

    endpointConfiguration.EnableInstallers();

    return endpointConfiguration;
});

BsonClassMap.RegisterClassMap<Todo.Domain.Todo>(cm =>
{
    cm.AutoMap();
    cm.SetIgnoreExtraElements(true);
    cm.MapCreator(() => new Todo.Domain.Todo());
});


builder.Services.AddControllers();

// Swagger stuff
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen(); 

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.Configure<MongoDbConfiguration>(builder.Configuration.GetSection("mongodb"));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IGenericRepository<Todo.Domain.Todo>>(x =>
    new GenericRepository<Todo.Domain.Todo>(x.GetRequiredService<IMongoClient>(),
        x.GetRequiredService<IOptions<MongoDbConfiguration>>().Value.Database, "todos",
        x.GetRequiredService<IUnitOfWork>()));

builder.Services.AddScoped<ITodoService, TodoService>();

builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    var configuration = serviceProvider.GetRequiredService<IOptions<MongoDbConfiguration>>();
    var mongoConnectionString = configuration.Value.ConnectionString;
    return new MongoClient(mongoConnectionString);
});

var app = builder.Build();
app.UseAuthentication();

// Not worried about cors for this example app.
app.UseCors(x =>
{
    x.AllowAnyHeader();
    x.AllowAnyMethod();
    x.AllowAnyOrigin();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // Set the Swagger UI at the app's root (optional)
    });
}

app.UseRouting(); // Enables routing
app.UseAuthorization();
app.UseUowMiddleware();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Maps controller actions to endpoints
});


app.Run();
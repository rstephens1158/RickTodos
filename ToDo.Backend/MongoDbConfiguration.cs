using MongoDB.Driver;

namespace ToDo.Backend;

public class MongoDbConfiguration
{
    public string ConnectionString { get; set; }

    public string Database { get; set; }
}
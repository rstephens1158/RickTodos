using AutoMapper;
using Todo.Contracts;

namespace ToDo.Backend.Code;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<TodoDto, Todo.Domain.Todo>()
            .ReverseMap();
    }
}
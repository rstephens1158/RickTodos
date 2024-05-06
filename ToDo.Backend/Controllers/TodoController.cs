using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NServiceBus;
using Todo.Common;
using Todo.Contracts;
using Todo.Domain;
using Todo.Persistence;

namespace ToDo.Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly IGenericRepository<Todo.Domain.Todo> _todoCoRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITodoService _todoService;

        public TodoController(IGenericRepository<Todo.Domain.Todo> todoCoRepository, IMapper mapper,
            IUnitOfWork unitOfWork, ITodoService todoService)
        {
            _todoCoRepository = todoCoRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _todoService = todoService;
        }

        // Allowing anonymous here so the frontend can get all todos for SSR purposes, just demo.  Never to do this in real production environment
        [AllowAnonymous]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllTodos()
        {
            var allTodos = await _todoCoRepository.GetItemsAsync(x => !x.IsComplete);

            return Ok(allTodos.Select(x => _mapper.Map<TodoDto>(x)).ToList());
        }
        
        [HttpGet]
        public async Task<IActionResult> GetUserTodos()
        {
            var allTodos = await _todoCoRepository.GetItemsAsync(x => x.UserId == User.FindFirstValue(ClaimTypes.NameIdentifier) && !x.IsComplete);

            return Ok(allTodos.Select(x => _mapper.Map<TodoDto>(x)).ToList());
        }

        [HttpPost]
        public async Task<IActionResult> AddPost(CreateTodoRequest createTodoRequest)
        {
            var newTodo = await _todoService.Create(createTodoRequest.Title, createTodoRequest.Description, User.FindFirstValue(ClaimTypes.NameIdentifier));

            return Ok(newTodo);
        }
        
        [HttpPut("complete")]
        public async Task<IActionResult> Complete(CompleteTodoRequest updateDtoRequest)
        {
            await _todoService.Complete(updateDtoRequest.Id);
            

            return Ok();
        }
        
        
    }
}
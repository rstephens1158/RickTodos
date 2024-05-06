using Moq;
using Microsoft.Extensions.Logging;
using Todo.Common;

namespace Todo.Domain.Tests
{
    [TestFixture]
    public class TodoServiceTests
    {
        private const string TestTitle = "Test Title";
        private const string TestDescription = "Test Description";
        private const string TestUser = "Test User";

        private Mock<IGenericRepository<Todo>> _todoRepositoryMock;
        private Mock<ILogger<TodoService>> _loggerMock;
        private TodoService _todoService;

        [SetUp]
        public void SetUp()
        {
            _todoRepositoryMock = new Mock<IGenericRepository<Todo>>();
            _loggerMock = new Mock<ILogger<TodoService>>();
            _todoService = new TodoService(_todoRepositoryMock.Object, _loggerMock.Object);
        }

        [Test]
        public async Task Create_ValidParameters_AddsTodoToRepository()
        {
            var expectedTodo = new Todo(TestTitle, TestDescription, false, TestUser);

            _todoRepositoryMock.Setup(repo => repo.Add(It.IsAny<Todo>())).Verifiable();

            var createdTodo = await _todoService.Create(TestTitle, TestDescription, TestUser);

            Assert.That(createdTodo.Title, Is.EqualTo(expectedTodo.Title));
            Assert.That(createdTodo.Description, Is.EqualTo(expectedTodo.Description));
            Assert.That(createdTodo.UserId, Is.EqualTo(expectedTodo.UserId));
            _todoRepositoryMock.Verify(repo => repo.Add(It.IsAny<Todo>()), Times.Once);
        }

        [Test]
        public async Task UpdateTodo_ValidParameters_UpdatesTodo()
        {
            var todoId = Guid.NewGuid();
            var updatedTitle = "Updated Title";
            var updatedDescription = "Updated Description";

            var todo = new Todo(TestTitle, TestDescription, false, TestUser);
            _todoRepositoryMock.Setup(repo => repo.GetAsync(todoId)).ReturnsAsync(todo);

            await _todoService.UpdateTodo(todoId, updatedTitle, updatedDescription);

            Assert.That(todo.Title, Is.EqualTo(updatedTitle));
            Assert.That(todo.Description, Is.EqualTo(updatedDescription));
            _todoRepositoryMock.Verify(repo => repo.GetAsync(todoId), Times.Once);
        }

        [Test]
        public async Task Complete_ValidId_CompletesTodo()
        {
            var todoId = Guid.NewGuid();

            var todo = new Todo(TestTitle, TestDescription, false, TestUser);
            _todoRepositoryMock.Setup(repo => repo.GetAsync(todoId)).ReturnsAsync(todo);

            await _todoService.Complete(todoId);

            Assert.IsTrue(todo.IsComplete);
            Assert.IsNotNull(todo.CompletedAt);
            _todoRepositoryMock.Verify(repo => repo.GetAsync(todoId), Times.Once);
        }
    }
}

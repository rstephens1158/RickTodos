using NUnit.Framework;
using Moq;
using System;

namespace Todo.Domain.Tests
{
    [TestFixture]
    public class TodoTests
    {
        private const string TestTitle = "Test Title";
        private const string TestDescription = "Test Description";
        private const string TestUser = "Test User";
        private const string UpdatedTitle = "Updated Title";
        private const string UpdatedDescription = "Updated Description";

        private Todo _todo;

        [SetUp]
        public void SetUp()
        {
            _todo = new Todo(TestTitle, TestDescription, false, TestUser);
            
            // We don't want the created event to be in the events collection for other tests.
            _todo.Events.Clear();
        }

        [Test]
        public void MarkComplete_CompletesTodoAndPublishesTodoCompletedEvent()
        {
            _todo.MarkComplete();

            Assert.IsTrue(_todo.IsComplete);
            Assert.IsNotNull(_todo.CompletedAt);        

            var all = _todo.Events.All(x => x is TodoCompletedEvent todoCompletedEvent && todoCompletedEvent.Id == _todo.Id);
            Assert.IsTrue(all, "TodoCompletedEvent not found in Events collection.");
        }

        [Test]
        public void Update_ValidParameters_UpdatesTodoAndPublishesTodoUpdatedEvent()
        {
            _todo.Update(UpdatedTitle, UpdatedDescription);

            Assert.That(_todo.Title, Is.EqualTo(UpdatedTitle));
            Assert.That(_todo.Description, Is.EqualTo(UpdatedDescription));
            
            var all = _todo.Events.All(x => x is TodoUpdatedEvent todoCompletedEvent && 
                                              todoCompletedEvent.Id == _todo.Id && 
                                              todoCompletedEvent.Title == UpdatedTitle && 
                                              todoCompletedEvent.Description == UpdatedDescription);
            Assert.IsTrue(all, "TodoUpdatedEvent not found in Events collection.");
        }

        [TestCase(null, "Test Description")]
        [TestCase("Test Title", null)]
        public void Update_NullOrEmptyParameters_ThrowsTodoInvariantException(string title, string description)
        {
            Assert.Throws<TodoInvariantException>(() => _todo.Update(title, description));
        }
    }
}

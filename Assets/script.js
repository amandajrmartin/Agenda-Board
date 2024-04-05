// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskButton = document.querySelector(".btn")

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let currentId = JSON.parse(localStorage.getItem("currentId"))
    if (!currentId) { currentId = 0 }
    currentId++;
    localStorage.setItem('currentId', currentId);
    return currentId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const todoList = $("#to-do")
    const taskCard = $("<div>").addClass("card-body draggable").attr('data-taskId', task.id)
    const cardTitle = $("<h2>").text(task.title)
    const cardDate = $("<h3>").text(task.date)
    const cardDescription = $("<h4>").text(task.description)
    const cardStatus = $("<h5>").text(task.status)
    const deleteButton = $('<button>').addClass("btn btn-danger").text('delete')
    if (task.date && task.status !== 'done') {
        const now = dayjs();
        const taskdate = dayjs(task.date, 'DD/MM/YYYY');
        // ? If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(taskdate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskdate)) {
            taskCard.addClass('bg-danger text-white');
            deleteButton.addClass('border-light');
        }
    } else { taskCard.addClass('card bg-success draggable') }
    taskCard.append(cardTitle, cardDate, cardDescription, cardStatus)
    return taskCard;
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(task => {
        createTaskCard()
    });
}
function submitTask(event) {
    event.preventDefault()
    const title = document.querySelector("#title").value
    const date = document.querySelector("#date").value
    const description = document.querySelector("#description").value
    console.log(title, date, description)
    const task = {
        title: title,
        date: date,
        description: description,
        id: generateTaskId(),
        status: "Not Started"
    }
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (!tasks) { tasks = [] }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTaskList()
}
// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    $("#dialog").html(`<form id="taskForm" onsubmit="submitTask(event)">
    <label for="title">Title:</label>
    <input type="text" id="title">
    <label for="date">Date:</label>
    <input type="date" id="date">
    <label for="description">Description:</label>
    <textarea name="description" id="description" cols="30" rows="10"></textarea>
    <button type="submit">Submit</button>
    </form>`)
    $("#dialog").dialog()
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const handleDeleteTask = document.getElementById(taskId)

    if (taskElement) {
        // Remove the task element from the DOM
        taskElement.remove();

        // Optionally, update the data source (e.g., an array of tasks)
        // tasks = tasks.filter(task => task.id !== taskId);
    } else {
        console.log(`Task with ID ${taskId} not found.`);
    }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskElementToDrop = document.getElementById('task1'); // Task element to drop
    const newStatus = 'In Progress'; // New status for the task
    dropTaskIntoStatus(taskElementToDrop, newStatus);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    taskButton.addEventListener('click', handleAddTask())
    submitbutton.addEventListener('click', submitTask)
});

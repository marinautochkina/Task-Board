// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

//function to generate a unique task id
function generateTaskId() {
    if (!nextId) {
        nextId = 0
    }
    const currentId = nextId;
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return currentId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    if (!taskList) {
        return
    }
    const taskCard = document.createElement('div');
    taskCard.className = 'card draggable mb-2';
    taskCard.id = 'task-' + task.id;
    taskCard.innerHTML = `
        <div class ="card-body">
            <h5 class="card-body">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
            <button class="btn btn-danger" onclick="handleDeleteTask(event)">Delete</button>
        </div>
        `;
        
    return taskCard;
}

//function to render the task list and make cards draggable
function renderTaskList() {
    const todoCards = document.getElementById('todo-cards');
    todoCards.innerHTML = ''
    taskList.forEach(task => {
        const card = createTaskCard(task)
        todoCards.appendChild(card);
        const currentDate=new Date();
        const dueDate = new Date(`${task.dueDate}`);
        console.log("Current Date: ", currentDate);
        console.log("Due Date: ", dueDate)
        if (dueDate<currentDate) {
            card.classList.add("task-card-pastdue");
        } else if (dueDate=currentDate) {
            card.classList.add("task-card-almost-due");
        }
    });
    $('.draggable').draggable({
        revert: 'invalid',
        zIndex: 100,
        connectToSortable: '.lane',
    });
}

//function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('due-date').value;
  
    const id = generateTaskId();
    const task = {id, title, description, dueDate}; 
    //Saving task to local storage
    taskList = taskList || [];//sets a default value for tasks as an empty array
    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    //Adding the new task card to the kanban board
    const card = createTaskCard(task);
    
    document.getElementById('todo-cards').appendChild(card);
    //Resetting values of modal inputs
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('due-date').value = '';
}

//function to handle deleting a task
function handleDeleteTask(event){
    const delBtn=event.target;
    const targetCard = delBtn.closest('.card');
    const id=targetCard.id;
    const str = id;
    const parts = str.split("-"); 
console.log(parts);
const index = parts[1];
console.log(index)
  
    localStorage.setItem("tasks", JSON.stringify(taskList));
    document.getElementById(`${id}`).remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const newStatus = event.target.id
    const taskId = ui.draggable[0].dataset.taskId

    $.each(taskList, function (task) {
        if(task.id == taskId) {
            task.status = newStatus;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $('.lane').sortable({
        connectWith: '.lane',
        tolerance: 'pointer',
        handle: '.taskCardHeader',
        cursor: 'move',
        placeholder: 'taskCard-placeholder'
    })
    // make lanes droppable for the cards
    $('.lane').droppable({
        accept: '.taskCard',
        drop: handleDrop,
    });
    //Adding event listener for the add task button
    addTaskBtn=$('#add-task-button').on('click', handleAddTask);
});

document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#due-date", {
      enableTime: true,
      dateFormat: "Y-m-d H:i", 
      onChange: function(selectedDates, dateStr, instance) {
        // Example: use Day.js to format the selected date
        console.log(dayjs(dateStr).format("YYYY-MM-DD HH:mm"));
      }
    });
    
});

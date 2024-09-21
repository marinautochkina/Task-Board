/*
To do 
1. create click event that pulls up task input questions
*/

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

$("#in-progress-cards").droppable();

const descriptions = [];
const taskButton = $('#buttonAdd');
const displayForm = $('#formId');
const cancelForm = $('#cancel');
const submitTask = $('#submitTask');

taskButton.on('click', function () {
    displayForm.show();
})

cancelForm.on('click', function () {
    displayForm.hide();
})

submitTask.on('click', handleAddTask)

function saveTasks(){
    localStorage.setItem("Task",JSON.stringify(tasks));
}



// Todo: create a function to generate a unique task id
function generateTaskId() {
    return `task-${1000*Math.random()}`
}

// Todo: create a function to create a task card

function createTaskCard(task) {
    const taskDiv = document.getElementById("todo-cards");
    const taskCard = document.createElement("div");
        taskCard.id = generateTaskId();
        taskCard.classList.add("task-card");
        
        //taskCard.classList.add();

        const taskTitleText = document.createElement("h1");
        taskTitleText.classList.add("taskTitleText");
        taskTitleText.innerText = `${task.taskTitleVal}`

        taskCard.appendChild(taskTitleText);
        
        taskDiv.appendChild(taskCard);

        const taskDescriptionText = document.createElement("p");
        taskDescriptionText.innerText = `${task.taskDescription} \n ${task.taskDueDate}`

        taskCard.appendChild(taskDescriptionText);

        taskDiv.appendChild(taskCard);

        const taskDelete = document.createElement("button");
        taskDelete.innerText = ("Delete");
        taskDelete.classList.add("task-delete");
        taskCard.appendChild(taskDelete);
        taskDelete.setAttribute('class','cardDeleteButton'); 
        taskDelete.addEventListener('click', handleDeleteTask);
}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    const taskDiv = document.getElementById("todo-cards");
    taskDiv.innerHTML = "";
    tasks.forEach(createTaskCard)
        //taskDelete.on('click', handleDeleteTask());

        //const taskDelete = $('<button>').addClass('btn btn-danger delete').text('Delete');
    
    //make tasks draggable using Jquery class dragable
    $(".task-card").draggable({appendTo: "body"});
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const title = document.getElementById("taskTitle");
    const taskTitleVal = title.value.trim();
    console.log(taskTitleVal);
    const description = document.getElementById("taskDescription");
    const taskDescription = description.value.trim();
    console.log(taskDescription);
    const date = document.getElementById("dueDate");
    const taskDueDate = date.value;
    console.log(taskDueDate);

    if(taskTitleVal !== "" && taskDescription !== "" && date !== ""){
        const newTask = {
            taskTitleVal,
            taskDescription,
            taskDueDate,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        title.value = "";
        description.value = "";
        date.value = "";
    }

    renderTaskList();


   /*if(taskDescription !== ""){
        const newTaskDescription = {
            taskDescription,
            completed: false
        };
        tasks.push(newTaskDescription);
        saveTasks();
        description.value = "";
    }*/
}

// Todo: create a function to handle deleting a task

//taskDelete.on('click', handleDeleteTask());


function handleDeleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTaskList();
  
    //Create event listener for the delete button in order to remove the div create new function to delete a task
   
    alert("Congratulations on finishing the task!");

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    //Get Task ID / # in array
    //for loop that updates the status of the dragged card and stays in the new column
    //save and render localStorage.setItem("Task",JSON.stringify(tasks));
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
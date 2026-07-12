// --------------------
// Load Saved Tasks
// --------------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");

const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

const themeBtn = document.getElementById("themeBtn");


// --------------------
// Current Date
// --------------------

const today = new Date();

document.getElementById("date").innerHTML =
today.toDateString();


// --------------------
// Save Tasks
// --------------------

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// --------------------
// Add Task
// --------------------

addBtn.addEventListener("click",function(){

    const text = taskInput.value.trim();

    if(text===""){

        alert("Please enter a task.");

        return;

    }

    const task = {

        id:Date.now(),

        text:text,

        priority:priority.value,

        dueDate:dueDate.value,

        completed:false

    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskInput.value="";

    dueDate.value="";

});


// --------------------
// Display Tasks
// --------------------

function displayTasks(){

    taskList.innerHTML="";

    tasks.forEach(function(task){

        createTask(task);

    });

    updateCounters();

    updateProgress();

}



// --------------------
// Create Task Card
// --------------------

function createTask(task){

    const li=document.createElement("li");

    li.className="task-item";

    li.dataset.id=task.id;

    let priorityClass="low";

    if(task.priority==="High")
        priorityClass="high";

    else if(task.priority==="Medium")
        priorityClass="medium";



    li.innerHTML=`

<div class="left">

<input
type="checkbox"
${task.completed ? "checked" : ""}
>

<div class="task-details">

<h3 class="${task.completed ? "completed":""}">
${task.text}
</h3>

<small>

📅 ${task.dueDate || "No Date"}

</small>

<span class="priority ${priorityClass}">

${task.priority}

</span>

</div>

</div>

<div class="actions">

<button class="edit">

<i class="fa-solid fa-pen"></i>

</button>

<button class="delete">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;


// Checkbox

const checkbox=li.querySelector("input");

checkbox.addEventListener("change",function(){

task.completed=this.checked;

saveTasks();

displayTasks();

});



// Delete Button

const deleteBtn=li.querySelector(".delete");

deleteBtn.addEventListener("click",function(){

tasks=tasks.filter(function(t){

return t.id!=task.id;

});

saveTasks();

displayTasks();

});



// Edit Button

const editBtn=li.querySelector(".edit");

editBtn.addEventListener("click",function(){

const newTask=prompt(

"Edit Task",

task.text

);

if(newTask!==null && newTask.trim()!==""){

task.text=newTask.trim();

saveTasks();

displayTasks();

}

});

taskList.appendChild(li);

}
// --------------------
// Search Tasks
// --------------------

search.addEventListener("keyup", function () {

    const value = search.value.toLowerCase();

    const items = document.querySelectorAll(".task-item");

    items.forEach(function(item){

        const text = item.querySelector("h3").innerText.toLowerCase();

        if(text.includes(value)){

            item.style.display="flex";

        }
        else{

            item.style.display="none";

        }

    });

});


// --------------------
// Update Counters
// --------------------

function updateCounters(){

    let completed = tasks.filter(function(task){

        return task.completed;

    }).length;

    let pending = tasks.length - completed;

    pendingCount.innerText = pending;

    completedCount.innerText = completed;

    totalCount.innerText = tasks.length;

}



// --------------------
// Update Progress Bar
// --------------------

function updateProgress(){

    if(tasks.length===0){

        progress.style.width="0%";

        progressText.innerText="0%";

        return;

    }

    let completed = tasks.filter(function(task){

        return task.completed;

    }).length;

    let percent = Math.round((completed/tasks.length)*100);

    progress.style.width = percent + "%";

    progressText.innerText = percent + "%";

}



// --------------------
// Dark Mode
// --------------------

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    themeBtn.innerHTML="☀️ Light Mode";

}

themeBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="☀️ Light Mode";

    }

    else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="🌙 Dark Mode";

    }

});



// --------------------
// Press Enter to Add Task
// --------------------

taskInput.addEventListener("keypress",function(event){

    if(event.key==="Enter"){

        addBtn.click();

    }

});



// --------------------
// Sort Tasks
// --------------------

tasks.sort(function(a,b){

    if(a.completed===b.completed){

        return 0;

    }

    return a.completed ? 1 : -1;

});



// --------------------
// Initial Load
// --------------------

displayTasks();
import './style.css'

class Task {
    constructor(title, description, dueDate, priority, list) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.list = list;
        this.isDone = false;
    }
}

let tasks = JSON.parse(localStorage.getItem("localTask")) || [];


const tasktoList = (title, description, dueDate, priority) => {
    const newTask = new Task(title, description, dueDate, priority, "default", false);
    tasks.push(newTask);
}
document.getElementById("sub").addEventListener("click", function (event) {
    event.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let priority = document.getElementById('priority').value;
    tasktoList(title, description, dueDate, priority);
    console.log(tasks);
    localStorage.setItem("localTask", JSON.stringify(tasks));
    taskShow();
    reloadPage()
    // readTaskIds()
    // readpriorityIds()
})

localStorage.setItem("localTask", JSON.stringify(tasks));
let task = localStorage.getItem("localTask");
task = JSON.parse(task);
function reloadPage() {
    location.reload();
}

const taskShow = function () {
    let tasksShow = document.querySelector(".tasks");
    tasksShow.innerHTML = "";
    for (let i = tasks.length - 1; i >= 0; i--) {

        tasksShow.innerHTML += `
    <ul>
      <li data-id="${i}"><button id="doing" class="${i}">✔️</button>  task: ${tasks[i].title} </li>
      <li style="margin-left: 1rem" class="hidden idNumber" data-id="${i}">🗒️ description: ${tasks[i].description}</li>
      <li style="margin-left: 1rem"  class="hidden " data-id="${i}">⏰ due : ${tasks[i].dueDate}</li>
      <li style="margin-left: 1rem"  class="hidden " data-id="${i}">⭐️ priority: <button id="priority" class="${i}">${tasks[i].priority}</button></li>
    <hr> 
    </ul>
    <button style="border: 1px solid gray; background-color: burlywood ; border-radius: 8px; padding: 4px 16px; margin: 8px" class="hidden done" data-id="${i}">Done</button> 
     <button style="border: 1px solid gray; background-color:gold ; border-radius: 8px; padding: 4px 16px; margin: 8px" class="hidden edit" data-id="${i}">Edit</button><br>
    `;

    }


}

function showTaskIds() {
    const showTaskId = document.querySelectorAll("#doing");
  showTaskId.forEach(taskId => {
        taskId.addEventListener("click", function (event) {
            const taskId = event.target.className;
            const removed = document.querySelector(`.idNumber[data-id="${taskId}"]`).dataset.id;
            const correctId = document.querySelectorAll(".hidden")
            correctId.forEach((id) => {
                if (id.dataset.id === removed) {
                    id.classList.toggle("hidden");
                }
            })
        });
    })
    taskShow();
}
function removeTask() {
  const removeTaskId = document.querySelectorAll(".done");
    removeTaskId.forEach(taskId => {
        taskId.addEventListener("click", function (event) {
    const taskId = event.target.dataset.id;
    tasks.splice(taskId, 1);
    // localStorage.clear();
    console.log(taskId.title)
    localStorage.setItem("localTask", JSON.stringify(tasks));
    taskShow();
    reloadPage()
    // showTaskIds()
    // readpriorityIds()
    // removeTask()
  });
})}
function editTask() {
    const editTaskId = document.querySelectorAll(".edit");
    editTaskId.forEach(taskId => {
        taskId.addEventListener("click", function (event) {
            const taskId = event.target.dataset.id;
            console.log(tasks[taskId])
            reloadPage()
            localStorage.setItem("taskForEdit", JSON.stringify(tasks[taskId]));
            // taskShow();
            // showTaskIds()
            // readpriorityIds()
            // removeTask()
        });
    })}

function readTaskIds() {
    const toogleDone = document.querySelectorAll("#doing");
    toogleDone.forEach(taskIds => {
        taskIds.addEventListener("click", function (event) {
            taskShow();
          // showTaskIds()
          //   readpriorityIds()
          // removeTask()
        });
    })
}

function readpriorityIds() {
    const tooglePriority = document.querySelectorAll("#priority");
    tooglePriority.forEach(priorityIds => {
        priorityIds.addEventListener("click", function (event) {
            const taskIndex = Number(event.target.className);
            tasks[taskIndex].priority = tasks[taskIndex].priority === "low" ? "high" : "low";
            localStorage.clear();
            localStorage.setItem("localTask", JSON.stringify(tasks));
            taskShow();
            reloadPage()
          // showTaskIds()
          //   readpriorityIds()
          // removeTask()
        });
    })
}

taskShow();
readTaskIds();
showTaskIds();
readpriorityIds()
removeTask()
editTask()






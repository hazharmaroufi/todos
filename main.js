import './style.css'
let selectedList = "default";
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


const tasktoList = (title, description, dueDate, priority, list) => {
    const newTask = new Task(title, description, dueDate, priority, list , false);
    tasks.push(newTask);
}
document.getElementById("sub").addEventListener("click", function (event) {
    event.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let priority = document.getElementById('priority').value;
    let list = (document.getElementById('list').value || "default");
    tasktoList(title, description, dueDate, priority,list);
    console.log(tasks);
    localStorage.setItem("localTask", JSON.stringify(tasks));
    taskShow();
    reloadPage()

})

localStorage.setItem("localTask", JSON.stringify(tasks));
let task = localStorage.getItem("localTask");
task = JSON.parse(task);

function reloadPage() {
    location.reload();
}

const taskShow = function () {
    let tasksShow = document.querySelector(".tasks");
    let listShow = document.querySelector(".lists");

    listShow.innerHTML = "";
    tasksShow.innerHTML = "";
    let listTasks = [...new Set(tasks.map(task => task.list))];
   for (let i = listTasks.length - 1; i >= 0; i--) {
   listShow.innerHTML += `
    <ul>
   <li style="margin-left: 1rem"  class="hidden " data-id="${i}"><button class="listselection">${listTasks[i]}</button></li>
    </ul>
   `
   }
   let listSelections = document.querySelectorAll(".listselection");
   listSelections.forEach(listSelection => {
       listSelection.addEventListener("click", function (event) {
     
           selectedList = (event.target.textContent );
           localStorage.setItem("selectedList", selectedList);

           taskShow();
           readTaskIds();
           removeTask()
           editTask();
       });
   });
    for (let i = tasks.length - 1; i >= 0; i--) {

        if (tasks[i].list === selectedList){
        tasksShow.innerHTML += `
    <ul>
      <li data-id="${i}"><button id="doing" class="${i}">✔️</button>  task: ${tasks[i].title} </li>
      <li style="margin-left: 1rem" class="hidden idNumber" data-id="${i}">🗒️ description: ${tasks[i].description}</li>
      <li style="margin-left: 1rem"  class="hidden " data-id="${i}">⏰ due : ${tasks[i].dueDate}</li>
      <li style="margin-left: 1rem"  class="hidden " data-id="${i}">⭐️ priority: <button id="priority" class="${i}">${tasks[i].priority}</button></li>
      <li style="margin-left: 1rem"  class="hidden " data-id="${i}">✏️ list : ${tasks[i].list}</li>
    <hr> 
    </ul>
    <button style="border: 1px solid gray; background-color: burlywood ; border-radius: 8px; padding: 4px 16px; margin: 8px" class="hidden done" data-id="${i}">Done</button> 
     <button style="border: 1px solid gray; background-color:gold ; border-radius: 8px; padding: 4px 16px; margin: 8px" class="hidden edit" data-id="${i}">Edit</button><br>
    `;

    }
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
    console.log(taskId.title)
    localStorage.setItem("localTask", JSON.stringify(tasks));
    taskShow();
    reloadPage()
  });
})}
function editTask() {
    const editTaskId = document.querySelectorAll(".edit");
    editTaskId.forEach(taskId => {
        taskId.addEventListener("click", function (event) {
            const taskId = event.target.dataset.id;
            const task = tasks[taskId];

            document.getElementById('editForm').style.display = "block";
            document.getElementById('editTitle').value = task.title;
            document.getElementById('editDescription').value = task.description;
            document.getElementById('editDueDate').value = task.dueDate;
            document.getElementById('editPriority').value = task.priority;
            document.getElementById('editList').value = task.list;

            document.getElementById('saveEdit').onclick = function () {
                task.title = document.getElementById('editTitle').value;
                task.description = document.getElementById('editDescription').value;
                task.dueDate = document.getElementById('editDueDate').value;
                task.priority = document.getElementById('editPriority').value;
                task.list = document.getElementById('editList').value;

                tasks[taskId]=task;
                localStorage.setItem("localTask", JSON.stringify(tasks));
         
                reloadPage()
                document.getElementById("editForm").style.display = "none";
            }
        });
    })}

function readTaskIds() {
    const toogleDone = document.querySelectorAll("#doing");
    toogleDone.forEach(taskIds => {
        taskIds.addEventListener("click", function (event) {
            taskShow();

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
        });
    })
}

taskShow();
readTaskIds();
showTaskIds();
readpriorityIds()
removeTask()
editTask()






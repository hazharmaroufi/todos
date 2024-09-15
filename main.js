import './style.css'

// localStorage.setItem("colorSetting", "#a4509b");
// localStorage.setItem("textColor", "#ffffff");
// let colorSetting = localStorage.getItem("colorSetting");
// let textColor = localStorage.getItem("textColor");
// document.getElementById("bgcolor").innerHTML = colorSetting;
// Storage.removeItem("textColor");
// localStorage.setItem("user", JSON.stringify(person));  for objects
// bgcolorForm.onchange = populateStorage; populateStorage is a function
// document.getElementById("bgcolor").style.backgroundColor = colorSetting;
// document.getElementById("bgcolor").style.color = textColor;
// console.log(colorSetting);
// document.querySelector('#bgcolor').innerHTML = `
//   <div>
// <p>test</p>
//   </div>
// `
// localStorage.clear();


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

// const task1 = new Task("buy milk", "buy full fat milk", "25-04-2025", "normal", "default");
// const task2 = new Task("buy low fat milk", "buy low fat milk", "23-04-2025", "normal", "home");
// const task3 = new Task("buy low fat milk", "buy low fat milk", "23-04-2025", "normal", "default");
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
  readTaskIds()
  readpriorityIds()
})

localStorage.setItem("localTask", JSON.stringify(tasks));
let task = localStorage.getItem("localTask");
task = JSON.parse(task);


const taskShow = function () {
  let tasksshow = document.querySelector(".tasks");
  tasksshow.innerHTML = "";
  for (let i = tasks.length - 1; i >= 0; i--) {
    tasksshow.innerHTML += `<p data-id =${i}>` + `<button id="doing"  class="${i}">✅ </button>` + " " + tasks[i].title + " : " + tasks[i].description + " due " + tasks[i].dueDate + " with " + `<button id="priority"  class="${i}">` + tasks[i].priority + `</button>` + " priority." + " " + `</p>`;
  }
}
function removeTaskIds() {
  const removeTaskId = document.querySelectorAll("#doing");
  removeTaskId.forEach(taskId => {
    taskId.addEventListener("click", function (event) {
      tasks.splice(event.target.className, 1);
      localStorage.clear();
      localStorage.setItem("localTask", JSON.stringify(tasks));
      taskShow();
      removeTaskIds()
      readTaskIds()
      readpriorityIds()
      // console.log(event.target.className);
    });
  })
}
function readTaskIds() {
  const toogleDone = document.querySelectorAll("#doing");
  toogleDone.forEach(taskIds => {
    taskIds.addEventListener("click", function (event) {
      taskShow();
      removeTaskIds()
      readpriorityIds()
    });
  })
}
function readpriorityIds() {
  const tooglePriority = document.querySelectorAll("#priority");
  tooglePriority.forEach(priorityIds => {
    priorityIds.addEventListener("click", function (event) {
      if (tasks[Number(event.target.className)].priority == "low") {
        tasks[Number(event.target.className)].priority = "high";
      } else {
        tasks[Number(event.target.className)].priority = "low";
      }
      localStorage.clear();
      localStorage.setItem("localTask", JSON.stringify(tasks));
      taskShow();
      removeTaskIds()
      readpriorityIds()
    });
  })
}


taskShow();
readTaskIds();
removeTaskIds();
readpriorityIds()
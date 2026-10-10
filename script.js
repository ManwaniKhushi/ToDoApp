const formShow = document.getElementById("showFormbtn");
const formEle = document.querySelector(".createTask");
const taskList = document.getElementById("taskList");
const getTask = document.querySelector("#todoForm");
const tasktitle1 = document.querySelector("#taskTitle");
const taskdes = document.querySelector("#taskDescription");
const error = document.getElementById("titleError");


let tasks = [];
let editingTaskId = null;

formShow.addEventListener("click" , function(event){
    event.preventDefault();
    editingTaskId = null;
    formEle.style.display = "block";
    getTask.reset();
    error.textContent = "";
});

function renderTasks(){
    taskList.innerHTML = "";
    tasks.forEach(function(task){
        const card = document.createElement("div");
        card.className = "card";
        const taskText = document.createElement("div");
        taskText.className = "taskText";
        const title = document.createElement("h5")
        title.className = "taskTitle";
        title.textContent = task.title;
        const description  = document.createElement("p");
        description.className = "taskdescription";
        description.textContent = task.description;
        taskText.append(title, description);

        const buttons = document.createEllement("div");
        buttons.className = "taskbuttons";
        const editButton = document.createElement("button");
        editButton.className = "editbtn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
        editingTaskId = task.id; 
        tasktitle1.value = task.title; 
        taskdes.value = task.description;
        error.textContent = "";
        formEle.style.display = "block";
    });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delbtn";
        deleteButton.textContent = "Delete";
            
        deleteButton.addEventListener("click", function () {
        tasks = tasks.filter((item) => item.id !== task.id);
        renderTasks();
         });

        buttons.append(editButton, deleteButton);
        card.append(taskText, buttons);
        taskList.appendChild(card);
    })
}

getTask.addEventListener("submit" ,function(event){
    event.preventDefault();
    const tasktitle =  tasktitle1.value.trim();
     if(tasktitle === ""){
     const error = document.getElementById("titleError")
     error.textContent = "*Task Title Should not be Empty";
     return; 
     }
     error.textContent ="";
     const now = new Date().toISOString()

const task = {
    id: Date.now(),
    title: tasktitle,
    description: taskdes.value.trim(),
    createdAt: now,
    updatedAt: now
};
tasks.push(task);
renderTasks();
formEle.style.display = "none";
  event.target.reset(); 
});



const formShow = document.getElementById("showFormbtn");
const formEle = document.querySelector(".createTask");
const taskList = document.getElementById("taskList");
const getTask = document.querySelector("#todoForm");

function saveTasks() {
     localStorage.setItem("todos", JSON.stringify(tasks));
}
const tasktitle1 = document.querySelector("#taskTitle");
const taskdes = document.querySelector("#taskDescription");
const error = document.getElementById("titleError");
const updatebtn = document.getElementById("createbtn");
const allTag = document.getElementById("alltag");
let tasks = JSON.parse(localStorage.getItem("todos")) || [];
let editingTaskId = null;

formShow.addEventListener("click" , function(event){
    event.preventDefault();
    editingTaskId = null;
    if(editingTaskId === null){
        updatebtn.textContent = "Add";
    }
    formEle.style.display = "block";
    getTask.reset();
    error.textContent = "";
});

function renderTasks(){
    taskList.innerHTML = "";
    if (tasks.length === 0) {
    allTag.textContent = "No tasks Added";
    }
    else{
        allTag.textContent = "All Tasks";
    }
   
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

        const buttons = document.createElement("div");
        buttons.className = "taskbuttons";
        const editButton = document.createElement("button");
        editButton.className = "editbtn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
        editingTaskId = task.id; 
        updatebtn.textContent = "Update";
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
        saveTasks()
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
     if(editingTaskId !== null){
        tasks = tasks.map(function(task){
            if(task.id === editingTaskId){
                return{
                    ...task,
                    title:tasktitle,
                    description : taskdes.value.trim(),
                    updatedAt : now,
                };
            }
            return task;
        });
        editingTaskId = null; 
     }
else {
     updatebtn.textContent = "Add";
    const newTask = {
      id: Date.now(),
      title: tasktitle,
      description: taskdes.value.trim(),
      createdAt: now,
      updatedAt: now,
    };
    tasks.push(newTask);
  }
   saveTasks();
  renderTasks();
  formEle.style.display = "none";
  event.target.reset();
});

renderTasks();
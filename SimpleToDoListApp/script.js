const AddBtn = document.getElementById("Add_task-btn");
const DeleteBtn = document.getElementById("DeleteAll_task-btn");
const Tasklist = document.getElementById("tasks-items");
const EnteredTasks = document.getElementById("Task_entry");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function SaveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function rendertasks() {
  Tasklist.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.done) {
      li.classList.add("completed");
    }

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    const DoneBttn = document.createElement("button");
    DoneBttn.textContent = task.done ? "Undo" : "Done";
    DoneBttn.onclick = () => {
      toggleDone(index);
    };

    const DeleteTaskBtn = document.createElement("button");
    DeleteTaskBtn.textContent = "Delete";
    DeleteTaskBtn.onclick = () => DeleteTask(index);

    taskActions.appendChild(DoneBttn);
    taskActions.appendChild(DeleteTaskBtn);

    li.appendChild(taskText);
    li.appendChild(taskActions);
    Tasklist.appendChild(li);
  });
}

function addTask() {
  const text = EnteredTasks.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }
  tasks.push({ text, done: false });
  EnteredTasks.value = "";
  SaveTasks();
  rendertasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  SaveTasks();
  rendertasks();
}

function DeleteTask(index) {
  tasks.splice(index, 1);
  SaveTasks();
  rendertasks();
}

function deleteAllTasks() {
  const DeleteConfirmation = confirm(
    "Are you sure you want to delete all tasks?"
  );
  if (DeleteConfirmation) {
    tasks = [];
    SaveTasks();
    rendertasks();
  }
}

AddBtn.addEventListener("click", addTask);
DeleteBtn.addEventListener("click", deleteAllTasks);
EnteredTasks.addEventListener("keypress", (key) => {
  if (key.key == "Enter") addTask();
});

rendertasks();

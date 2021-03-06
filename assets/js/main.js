let task_title, task_description, task_createdAt, today, task_point;
var task_id = 0;
let todos = JSON.parse(localStorage.getItem("todo-list"));
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const taskTitleInput = document.querySelector("#title");
const taskDescriptionInput = document.querySelector("#description");
const taskPointInput = document.querySelector("#point");
let isEditTask = false;

// check if input is empty or not
function validateInput(input){
    if(input.length > 0) {
        return true;
    }
    return false;
}

// generate a random number
function generateTaskId() {
    return Math.floor(Math.random() * 1000);
}

//handle on click add new task button
$("#add_task").on( 'click', function () {
    task_title =  $("#title").val();
    task_description = $("#description").val();
    today = new Date();
    task_point = $("#point").val();
    task_createdAt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+ (today.getHours() % 12 || 12) + ":" + today.getMinutes() + ":" + today.getSeconds();
    task_id = generateTaskId();
    if(!isEditTask) {
        if(validateInput(task_title)){
            todos = !todos ? [] : todos;
            let taskInfo = {id: task_id, title: task_title, description: task_description, point: task_point, IsDone: false, CreatedAt: task_createdAt };
            todos.push(taskInfo);
            $("#title").val("");
            $("#description").val("");
            $("#point").val("");
        } else {
            alert("Title is required");
        }
    } else {
        isEditTask = false;
        todos[editId].title = task_title;
        todos[editId].description = task_description;
        todos[editId].point = task_point;
        $("#title").val("");
        $("#description").val("");
        $("#point").val("");
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});


//filter tasks
function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.IsDone === true ? "checked" : "";
            if(String(filter) === String(todo.IsDone) || filter == "all") {
                liTag += `<li class="task ${completed}">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <div>
                                    <div class="flex">
                                        <h3>${todo.title}</h3>
                                        <p class="points">${todo.point}</p>
                                    </div>
                                    <p>${todo.description}</p>
                                </div>
                            </label>
                            <div class="settings">
                                <ul class="task-menu">
                                    <li class="edit" onclick='editTask(${id}, "${todo.title}", "${todo.description}", "${todo.point}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li class="trash" onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

//handle on click filter buttons (pending / completed)
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

//update task status
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.parentElement;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].IsDone = true;
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].IsDone = false;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

//delete task
function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

//edit task
function editTask(taskId, title, description, point) {
    isEditTask = true;
    editId = taskId;
    taskTitleInput.value = title;
    taskDescriptionInput.value = description;
    taskPointInput.value = point;
    taskTitleInput.focus();
    taskTitleInput.classList.add("active");
}

//search tasks
$("#search_task").on( 'click', function () {
    task_title =  $("#title").val();
    task_description = $("#description").val();
    let liTag = "";

    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.IsDone === true ? "checked" : "";
            if(task_title === todo.title || task_description === todo.description ) {
                liTag += `<li class="task ${completed}">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <div>
                                    <h3>${todo.title}</h3>
                                    <p>${todo.description}</p>
                                </div>
                            </label>
                            <div class="settings">
                                <ul class="task-menu">
                                    <li class="edit" onclick='editTask(${id}, "${todo.title}", "${todo.description}", "${todo.point}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li class="trash" onclick='deleteTask(${id}, "all")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
            taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
        });
    }
});

// sort tasks by points
$("#sort_task").on( 'click', function () {
    let todos_sort = todos.sort((a, b) => {
        if (a.point > b.point) {
            return -1;
        }
        if (a.point < b.point) {
            return 1;
        }
        return 0;
    });

    function showTodo(filter) {
        let liTag = "";
        if(todos_sort) {
            todos_sort.forEach((todo, id) => {
                let completed = todo.IsDone === true ? "checked" : "";
                if(String(filter) === String(todo.IsDone) || filter == "all") {
                    liTag += `<li class="task ${completed}">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <div>
                                    <div class="flex">
                                        <h3>${todo.title}</h3>
                                        <p class="points">${todo.point}</p>
                                    </div>
                                    <p>${todo.description}</p>
                                </div>
                            </label>
                            <div class="settings">
                                <ul class="task-menu">
                                    <li class="edit" onclick='editTask(${id}, "${todo.title}", "${todo.description}", "${todo.point}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li class="trash" onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
                }
            });
        }
        taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
        let checkTask = taskBox.querySelectorAll(".task");
        taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
    }
    showTodo("all");
});
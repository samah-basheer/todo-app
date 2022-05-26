let task_title, task_description, task_createdAt, today, task_point;
var task_id = 0;
let todos = JSON.parse(localStorage.getItem("todo-list"));
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");

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

    if(validateInput(task_title)){
        todos = !todos ? [] : todos;
        let taskInfo = {id: task_id, title: task_title, description: task_description, point: task_point, IsDone: false, CreatedAt: task_createdAt };
        todos.push(taskInfo);
    } else {
        alert("Title is required");
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
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <div>
                                    <h3>${todo.title}</h3>
                                    <p>${todo.description}</p>
                                </div>
                            </label>
                            <div class="settings">
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
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
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].IsDone = true;
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].IsDone = false;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}


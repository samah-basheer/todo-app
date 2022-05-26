let task_title, task_description, task_createdAt, today, task_point;
var task_id = 0;
let todos = JSON.parse(localStorage.getItem("todo-list"));

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
});
console.log(todos);
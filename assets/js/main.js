let title, description, task_createdAt, today, task_point;
let todos = JSON.parse(localStorage.getItem("todo-list"));

// check if input is empty or not
function validateInput(input){
    if(input.length>0) {
        return true;
    }
    return false;
}

$("#add_task").on( 'click', function () {
    task_title =  $("#title").val();
    task_description = $("#description").val();
    today = new Date();
    task_point = $("#point").val();
    task_createdAt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+ (today.getHours() % 12 || 12) + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(task_description);
    if(validateInput(title) && validateInput(description)){
        let taskInfo = {title: task_title, description: task_description, point: task_point, IsDone: false, CreatedAt: task_createdAt };
        todos.push(taskInfo);
    }else{
        alert("Title & description are required");
    }
});

let title, description;

// check if input is empty or not
function validateInput(input){
    if(input.length>0) {
        return true;
    }
    return false;
}

$("#add_task").on( 'click', function () {
    title =  $("#title").val();
    description = $("#description").val();
    if(validateInput(title) && validateInput(description)){

    }else{
        alert("Title & description are required");
    }
});


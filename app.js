
var       date = document.getElementById("date").value,
          body_part = document.getElementById("body-area"),
          selected_body_part = getSelectedOption(body_part).text,
          exercise = document.getElementById("exercise").value 

var opt;

function getSelectedOption(sel) {
    //var opt;
    for ( var i = 0, len = sel.options.length; i < len; i++ ) {
        opt =sel.options[i];
        if ( opt.selected === true ) {
            break;
        }
    }
    return opt;
}



class GymSchedule{
    constructor (date, selected_body_part, exercise){
    this.date = date
    this.selected_body_part = selected_body_part
    this.exercise = exercise
}



}

class UI {
    
    addScheduleToList (gymschedule){
    
        const list = document.getElementById('gym-list');
        //create  tr elements
        const row = document.createElement('tr')
        //insert cols
        row.innerHTML = `<td>${gymschedule.date}</td>
                         <td>${gymschedule.selected_body_part}</td>
                         <td>${gymschedule.exercise}</td>
                         <td><a href ='#' class = delete></a>X</td>`

                         list.appendChild(row)
}


showAlert(message, className){
    //create a div 
    var div = document.createElement('div');

    //add class to div

    div.className = `alert ${className}`;
     
    //create and append textNode
    div.appendChild(document.createTextNode(message));

    //get parent 
    var container = document.querySelector('.container');
    //get form 
    var form = document.querySelector('#book-form');
    //insert alert 
    container.insertBefore(div, form)

    //timeout after 3 sec 
    setTimeout(function(){
        document.querySelector('.alert').remove()

    }, 3000)

}

}



document.getElementById('book-form').addEventListener('submit', function(e){
    //get values
    var date = document.getElementById("date").value,
    body_part = document.getElementById("body-area"),
    selected_body_part = getSelectedOption(body_part).text
   
    exercise = document.getElementById("exercise").value

     if (date != '' && selected_body_part != '---select---' && exercise != '' ) {
        // instatiate a new schedule 
        const gymschedule = new GymSchedule(date, selected_body_part,exercise);

        //instatiate a new UI 
        const ui = new UI();
        ui.addScheduleToList(gymschedule)
        ui.showAlert('schedule added', 'success')

     } else{
         const ui = new UI()
         ui.showAlert('please fill all fields', 'error')
     }   
 

  

  e.preventDefault();

})









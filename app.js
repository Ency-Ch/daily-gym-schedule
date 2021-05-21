
/*8*let  date = document.getElementById("date").value,
          body_part = document.getElementById("body-area"),
          selected_body_part = getSelectedOption(body_part).text,
          exercise = document.getElementById("exercise").value 
*/
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
                         <td><a href ='#' class = delete>X</a></td>`

                         list.appendChild(row)
}


showAlert(message, className){
    //create a div 
    const div = document.createElement('div');

    //add class to div

    div.className = `alert ${className}`;
     
    //create and append textNode
    div.appendChild(document.createTextNode(message));

    //get parent 
    const container = document.querySelector('.container');
    //get form 
    const form = document.querySelector('#book-form');
    //insert alert 
    container.insertBefore(div, form)

    //timeout after 3 sec 
    setTimeout(function(){
        document.querySelector('.alert').remove()

    }, 3000)

}
clearFields(){

    document.getElementById("date").value ='';
    document.getElementById("body-area").value = '';
    //selected_body_part = getSelectedOption(body_part).text
    document.getElementById("exercise").value = '';
   }

deleteSchedule(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }

}


}

class Store {
    static getSchedules() {
      let gymschedules;
      if(localStorage.getItem('gymschedules') === null) {
        gymschedules = [];
      } else {
        gymschedules = JSON.parse(localStorage.getItem('gymschedules'));
      }
  
      return gymschedules;
    }
  
    static displaySchedule() {
      const gymschedules = Store.getSchedules();
  
      gymschedules.forEach(function(gymschedule){
        const ui  = new UI;
  
        // Add book to UI
        ui.addScheduleToList (gymschedule)
      });
    }
  
    static addSchedule(gymschedule) {
      const gymschedules = Store.getSchedules();
  
      gymschedules.push(gymschedule);
  
      localStorage.setItem('gymschedules', JSON.stringify(gymschedules));
    }
    static removeSchedule(exercise) {
        const gymschedules = Store.getSchedules();
    
        gymschedules.forEach(function(gymschedule, index){
         if(gymschedule.exercise === exercise) {
          gymschedules.splice(index, 1);
         }
        });
    
        localStorage.setItem('gymschedules', JSON.stringify(gymschedules));
      }
  }
document.getElementById('book-form').addEventListener('submit', function(e){
    //get values
    const date = document.getElementById("date").value,
    body_part = document.getElementById("body-area"),
    selected_body_part = getSelectedOption(body_part).text
    exercise = document.getElementById("exercise").value

   


     if (date != '' && selected_body_part != '---select---' && exercise != '' ) {
     // instatiate a new schedule 
    const gymschedule = new GymSchedule(date, selected_body_part,exercise);
    //instatiate a new UI 
    const ui = new UI();
        
        ui.addScheduleToList(gymschedule);

         //add to local storage
        Store.addSchedule(gymschedule)
       
       
        ui.showAlert('schedule added', 'success');
        ui.clearFields();

       

     } else{
        const ui = new UI();
        
         ui.showAlert('please fill all fields', 'error');
     }  

  
  

  e.preventDefault();

})
//DOM Load event for display 
document.addEventListener('DOMContentLoaded', Store.displaySchedule)



//event listner for delete
document.getElementById('gym-list').addEventListener('click', function(e){
    //insatiate a new ui object 
    const ui = new UI()
    ui.deleteSchedule(e.target)
    Store.removeSchedule(e.target.parentElement.previousElementSibling.textContent)
    console.log(Store.removeSchedule(e.target.parentElement.previousElementSibling.textContent))
    ui.showAlert('schedule removed', 'success')
    

    e.preventDefault()
    console.log(e.target)
})


/// event listner fo the delete and remove from storage 
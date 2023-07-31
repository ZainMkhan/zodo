  //Home Page Greeting Functions

  const todayDate = new Date();
  const dateToString = todayDate.toDateString();

  let month = dateToString.substring(3, 7)
  let date = dateToString.substring(7, 10);
  let time = todayDate.getHours();

  console.log(time)

  let greetingMonth = document.querySelector(".today-day");
  greetingMonth.innerText = month;

  let greetingDate = document.querySelector(".today-date");
  greetingDate.innerText = date;


  // Function to check Time of the day for Greet Heading

  function timeOfTheDay(time) {
    if (time >= 0 && time < 6) {
      return "Good Night";
    } else if (time >= 6 && time < 12) {
      return "Good Morning";
    } else if (time >= 12 && time < 18) {
      return "Good Afternoon";
    } else if (time >= 18) {
      return "Good Evening";
    }
  }

    
  let greetingHeading = document.querySelector(".greetings");
  const greeting = timeOfTheDay(time);
  greetingHeading.innerText = greeting;

//   Task List Appending and Functions

const ul = document.querySelector(".task-list");
const dateSelected = document.querySelector(".calendar-date");
const prioritySelect = document.querySelectorAll('input[type="radio"]')
const errorMessage = document.querySelector(".error-message");

let priorirtySelected;


// Sort Button Function to Open
const sortBtn = document.querySelector(".sort-btn");

function openSortList(){
    let optionList = document.querySelector(".sort-options");
    optionList.classList.toggle("show");
}

sortBtn.addEventListener('click', openSortList);

//Input Text Field Open Function

const textField = document.querySelector(".task-field");

textField.addEventListener("click", taskFieldExpand => {
    //If Sort List is open then close it
    let optionList = document.querySelector(".sort-options");
    optionList.classList.remove("show");
    //Function to Expand Task Field
    let expandTaskField = document.querySelector(".task-field-extra");
    expandTaskField.classList.add("show");


    dateSelected.addEventListener("change", (event) => {
        dateSelected.value = event.target.value;
    });


    prioritySelect.forEach((radio) => {
        radio.addEventListener("change", (event) => {
            priorirtySelected = event.target.value;
        });
    });

});

//Add List on Pressing "Enter"

function enterPressSubmit(e){
    let expandTaskField = document.querySelector(".task-field-extra");
    
    expandTaskField.classList.add("show"); 
    if(e.key === "Enter"){
        if(textField.value === ""){
            showError("Please enter a Task");
            
        }else{
        addToList(textField.value, dateSelected.value, priorirtySelected);
        }
        if(textField.value === ""){
            expandTaskField.classList.remove("show"); 
        }
    }


}

textField.addEventListener("keypress", enterPressSubmit)


// Show error Functions

function showError(message){
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    errorMessage.style.transform = "translateX(0%)";
    setTimeout(function(){
        errorMessage.style.transform = "translateX(-100%)";
    },4000)
}
//Priority Checker

function checkPriority(priority, element) {
  element.closest(".task-display-priority").classList.remove("low", "medium", "high");
  let selectedPriority = priority;
  console.log(selectedPriority);

  if (selectedPriority === "low") {
    element.closest(".task-display-priority").classList.add("low");
  } 
  if (selectedPriority === "medium") {
    element.closest(".task-display-priority").classList.add("medium");
  }
  if (selectedPriority === "high") {
    element.closest(".task-display-priority").classList.add("high");
  } 
}


// Add Task to List Function

function addToList(task , date , priority){

    //TaskDisplayCon creating elements and appending them

    let taskDisplayCon = document.createElement("div");
    taskDisplayCon.classList.add("task-display-con")

    let doneIcon = document.createElement("span");
    doneIcon.classList.add("done-icon");
    doneIcon.innerHTML = '<i class="fa-solid fa-circle-notch"></i>'

    let liTask = document.createElement("li");
    liTask.classList.add("task");

    let taskDisplayImportants = document.createElement("div");
    taskDisplayImportants.classList.add("task-display-imp");

    let TaskPriority = document.createElement("span");
    TaskPriority.classList.add("task-display-priority");
    TaskPriority.innerText = "#" + priority;
   

    let taskDate = document.createElement("span");
    taskDate.classList.add("task-display-date");
    taskDate.innerText = date;
    

    //--Appending these ^

    taskDisplayCon.append(doneIcon)
    taskDisplayCon.append(liTask);
    liTask.innerText = task;
    taskDisplayCon.append(taskDisplayImportants);

    taskDisplayImportants.append(TaskPriority);
    taskDisplayImportants.append(taskDate);
    

    //TaskEditExpand creating elements and appending them

    let taskEditExpand = document.createElement("div");
    taskEditExpand.classList.add("task-edit-expand");

    let editDate = document.createElement("div");
    editDate.classList.add("input-date");

    let editPriorityOptionsCon = document.createElement("div");
    editPriorityOptionsCon.classList.add("input-priority");
    editPriorityOptionsCon.classList.add("task-option");

    let editSubmitCon = document.createElement("div");
    editSubmitCon.classList.add("edit-submit-con");


    taskEditExpand.append(editDate);
    taskEditExpand.append(editPriorityOptionsCon);
    taskEditExpand.append(editSubmitCon);

    //EditDate Appends

    let editDateHeading = document.createElement("div");
    editDateHeading.classList.add("date-heading-con")
    editDateHeading.classList.add("task-option")

    let labelDate = document.createElement("label");
    labelDate.setAttribute("for", "date");
    labelDate.classList.add("select-date-heading");

    let dateCalendar = document.createElement("div");
    dateCalendar.classList.add("date-calendar-con")

    let editInputDate = document.createElement("input");
    editInputDate.setAttribute("type", "date");
    editInputDate.classList.add("calendar-date");

    editDate.append(editDateHeading)
    editDateHeading.innerText = "Edit Date : ";
    editDateHeading.append(labelDate)

    editDate.append(dateCalendar);
    dateCalendar.append(editInputDate);

    // editPriorityOptionsCon Appends

    let editPriorityHeading = document.createElement("div");
    editPriorityHeading.classList.add("priority-heading-con");

        let labelForEditPriority = document.createElement("label");
        labelForEditPriority.setAttribute("for", "priority");
        labelForEditPriority.classList.add("select-priority-heading");
        labelForEditPriority.innerText = "Edit Priority : ";

        editPriorityOptionsCon.append(editPriorityHeading);
        editPriorityHeading.append(labelForEditPriority);
        
    // Function to generate a unique ID
function generateUniqueId(prefix) {
    return prefix + Math.random().toString(36).substr(2, 9);
  }
  
  // Generate unique IDs for the radio inputs and labels
  const uniqueId1 = generateUniqueId("edt-low-");
  const uniqueId2 = generateUniqueId("edt-medium-");
  const uniqueId3 = generateUniqueId("edt-high-");
  
  // Creating the radio options dynamically

  let editPriorityRadioOptions = document.createElement("div");
  editPriorityRadioOptions.classList.add("radio-options");

  editPriorityOptionsCon.append(editPriorityRadioOptions);
  
  let radioInput1 = document.createElement("input");
  let radiolabel1 = document.createElement("label");
  radiolabel1.setAttribute("for", uniqueId1)
  radioInput1.classList.add("priority");
  radiolabel1.innerText = "Low"
  radioInput1.setAttribute("type", "radio");
  radioInput1.setAttribute("name", "option");
  radioInput1.setAttribute("value", "low");
  radioInput1.setAttribute("id", uniqueId1);
  
  
  let radioInput2 = document.createElement("input");
  let radiolabel2 = document.createElement("label");
  radiolabel2.setAttribute("for", uniqueId2)
  radiolabel2.innerText = "Medium"
  radioInput2.setAttribute("type", "radio");
  radioInput2.setAttribute("name", "option");
  radioInput2.setAttribute("value", "medium");
  radioInput2.setAttribute("id", uniqueId2);
  
  let radioInput3 = document.createElement("input");
  let radiolabel3 = document.createElement("label");
  radiolabel3.setAttribute("for", uniqueId3);
  radiolabel3.innerText = "High"
  radioInput3.setAttribute("type", "radio");
  radioInput3.setAttribute("name", "option");
  radioInput3.setAttribute("value", "high");
  radioInput3.setAttribute("id", uniqueId3);
  
  // Append the radio inputs and labels to the parent div
  editPriorityRadioOptions.append(radioInput1);
  editPriorityRadioOptions.append(radiolabel1);
  editPriorityRadioOptions.append(radioInput2);
  editPriorityRadioOptions.append(radiolabel2);
  editPriorityRadioOptions.append(radioInput3);
  editPriorityRadioOptions.append(radiolabel3);
  
  // Function to create and add CSS rules dynamically
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    label[for="${uniqueId1}"], label[for="${uniqueId2}"], label[for="${uniqueId3}"] {
      color: white;
      padding: 2%;
      background-color: #526D82;
      width: 30%;
      text-align: center;
      border: none;
      outline: none;
      font-weight: 600;
      font-size: 1em;
      border-radius: 0.2em;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  
    label[for="${uniqueId1}"]:before, label[for="${uniqueId2}"]:before, label[for="${uniqueId3}"]:before {
      content: "";
      border: 3px solid #F6C90E;
      border-radius: 50%;
      width: 15px;
      height: 15px;
    }
  
    input[type="radio"]:checked + label[for="${uniqueId1}"] {
      background-color: #49FF00;
      color: black;
    }
  
    input[type="radio"]:checked + label[for="${uniqueId2}"] {
      background-color: #FF5B00;
      color: black;
    }
  
    input[type="radio"]:checked + label[for="${uniqueId3}"] {
      background-color: #FF0000;
      color: black;
    }
  
    input[type="radio"]:checked + label[for="${uniqueId1}"]:before,
    input[type="radio"]:checked + label[for="${uniqueId2}"]:before,
    input[type="radio"]:checked + label[for="${uniqueId3}"]:before {
      height: 7.5px;
      width: 7.5px;
      border-radius: 50%;
      border: 5px solid black;
      transition: all 250ms;
    }
  `;
  // Edit Submit Btn Append
    let editSubmitBtn = document.createElement("button");
    editSubmitBtn.classList.add("edit-submit-btn");

    editSubmitCon.append(editSubmitBtn);
    editSubmitBtn.innerText = "Edit Submit"

    //Edit Submit Btn Functionality 
    let editPriorirtySelected;
    let editPrioritySelects = editPriorityRadioOptions.querySelectorAll('input[type="radio"]');
    let editDateSelected = editDate.querySelector(".calendar-date");

    editDateSelected.addEventListener("change", (event) => {
      editDateSelected.value = event.target.value;
    });


    editPrioritySelects.forEach((radio) => {
      radio.addEventListener("change", (event) => {
        editPriorirtySelected = event.target.value;
          });
    });

    editSubmitBtn.addEventListener("click", function() {


      if (editDateSelected.value !== "" && editPriorirtySelected !== "") {
        // Both date and priority have been edited
        taskDate.innerText = editDateSelected.value;
        TaskPriority.innerText = "#" + editPriorirtySelected;
        checkPriority(editPriorirtySelected, TaskPriority);
        this.closest(".task-edit-expand").classList.remove("expand");
      } else if (dateSelected.value !== "") {
        // Only the date has been edited
        taskDate.innerText = editDateSelected.value;
      } else if (editPriorirtySelected !== "") {
        // Only the priority has been edited
        TaskPriority.innerText = "#" + editPriorirtySelected;
        checkPriority(editPriorirtySelected, TaskPriority);
      } else {
        this.closest(".task-edit-expand").classList.remove("expand");
        // Neither date nor priority have been edited
        // You can add any specific actions or handling for this case if needed.
      }
      
      // After handling the edit, remove the "expand" class from the closest ancestor element.
      









      // if(dateSelected.value === "" || editPriorirtySelected === ""){
      //   this.closest(".task-edit-expand").classList.remove("expand");
      //   return;
      // }
      // else if(editDateSelected.value != "" && editPriorirtySelected === "" ){
      //   taskDate.innerText = editDateSelected.value;
      //   this.closest(".task-edit-expand").classList.remove("expand");
      //   return;
      // }
      // else if(editDateSelected === "" && editPriorirtySelected != ""){
      //   TaskPriority.innerText = "#" + editPriorirtySelected;
      //   checkPriority(editPriorirtySelected,TaskPriority)
      //   this.closest(".task-edit-expand").classList.remove("expand");
      // }


      // if(editDateSelected.value === "" ){
      //   this.closest(".task-edit-expand").classList.remove("expand");
      //   return;
      // }
      // else if(editPriorirtySelected === ""){
      //   this.closest(".task-edit-expand").classList.remove("expand");
      //   return;
      // }
      // else{
      //   this.closest(".task-edit-expand").classList.remove("expand");
      // }
      
    });
  
  // Adding the CSS rules to the document
  document.head.appendChild(styleElement);
  
    // Ul  Appending TasK Container 

    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-con");

    ul.append(taskContainer);

    // TaskContainer appending TaskDisplayCon and TaskEditExpand

    taskContainer.append(taskDisplayCon);
    taskContainer.append(taskEditExpand);

    textField.value = "";
    dateSelected.value = "";
    checkPriority(priority,TaskPriority)
    priority.checked = false;


    prioritySelect.forEach((radio) => {
      radio.checked = false;
  });









}


//Task List Expanding Function

const expandEditTaskLi = document.querySelector(".task-list");


expandEditTaskLi.addEventListener("click", function (e) {
  
  if (e.target.classList.contains("task")) {
        const taskElement = e.target;
        const taskEditExpand = taskElement.parentNode.nextElementSibling;
        if (taskEditExpand) {
          taskEditExpand.classList.toggle("expand");
        }
    }
  });





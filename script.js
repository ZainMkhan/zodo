let taskList;
let preSavedTaskList;
function loadTasksFromLocalStorage() {
  taskList = JSON.parse(localStorage.getItem("TaskList")) || [];
  if (taskList.length === 0) {
    return;
  } else {
    preSavedTaskList = [...taskList];
    taskList.forEach((tasks) => {
      addToList(tasks.priority, tasks.task, tasks.date, tasks.status);

    });
  }
}

let index;
  
  //Home Page Greeting Functions

  const todayDate = new Date();
  const dateToString = todayDate.toDateString();

  let month = dateToString.substring(3, 7)
  let date = dateToString.substring(7, 10);
  let time = todayDate.getHours();

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

//Sort by Date .. 
function sortByDate(event) {
  if (!event.target.classList.contains("sort-date")) {
      return;
  }
  if (event.target.classList.contains("sort-date")) {
      let taskDisplayList = document.querySelector(".task-list");
      let sortDateBtn = event.target;

      sortDateBtn.classList.toggle("selected");
      taskDisplayList.classList.toggle("date-sorted");

      
      if(taskDisplayList.classList.contains("date-sorted") && taskDisplayList.classList.contains("priority-sorted")){
        showError("Please unselect Priority Sort")
        sortDateBtn.classList.toggle("selected");
        return;
      }
      
      if (!taskDisplayList.classList.contains("date-sorted")) {
          taskList = [...preSavedTaskList];
          statusBottomTask(taskList) 
      }
      else {
          let includesDate = taskList.filter((task) => task.date !== "");
          let notIncludesDate = taskList.filter((task) => task.date === "");
          taskList = [...includesDate, ...notIncludesDate];
          taskList = taskList.sort((task1, task2) => new Date(task1.date) - new Date(task2.date));
          statusBottomTask(taskList)
      }
      clearTaskList();
      renderTasks();
  }
}


// Sort by priority 
function sortByPriority(event){
  if(!event.target.classList.contains("sort-priority")){
    return;  
  }
  else if(event.target.classList.contains("sort-priority")){
    let taskDisplayList = document.querySelector(".task-list");
    let sortPrioritBtn = event.target;

    sortPrioritBtn.classList.toggle("selected");
    taskDisplayList.classList.toggle("priority-sorted");

    if(!taskDisplayList.classList.contains("priority-sorted")){
      taskList = [...preSavedTaskList];
      statusBottomTask(taskList) 
    }
    if(taskDisplayList.classList.contains("priority-sorted") && taskDisplayList.classList.contains("date-sorted")){
      showError("Please unselect Date Sort")
      sortPrioritBtn.classList.toggle("selected");
      return;
    }
    else if(taskDisplayList.classList.contains("priority-sorted")){
      console.log(taskList.priority)
      let includesPriority = taskList.filter((task) => task.priority !== "");
      let notIncludesPriority = taskList.filter((task) => task.priority === "");

      taskList = [...includesPriority, ...notIncludesPriority];

      taskList = taskList.sort((task1, task2) =>{
        const priorityOrder = {
          "low" : 1,
          "medium" : 2,
          "high" : 3,
        };

      return priorityOrder[task1.priority] - priorityOrder[task2.priority];
      })
    }
    clearTaskList();
    renderTasks();
  }
}


// Clear the existing tasks from the task list
function clearTaskList() {
  const taskListContainer = document.querySelector(".task-list");
  taskListContainer.innerHTML = "";
}

// Render the sorted tasks
function renderTasks() {
  taskList.forEach(task => {
      addToList(task.priority, task.task, task.date, task.status);
  });
}


document.addEventListener("click", sortByPriority);
document.addEventListener("click", sortByDate)

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
    //Checking Priority if not selected then remain empty and not Undefined
    if(typeof priorirtySelected === "undefined"){
      priorirtySelected = "";
    }
        taskList.push({
          task : textField.value,
          date : dateSelected.value,
          priority : priorirtySelected,
          status : false,
        })
        taskList = statusBottomTask(taskList);
        localStorage.setItem("TaskList", JSON.stringify(taskList));
        addToList(priorirtySelected, textField.value, dateSelected.value, status)
        location.reload();
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

  if (selectedPriority === "low") {
    element.closest(".task-display-priority").classList.add("low");
  } 
  if (selectedPriority === "medium") {
    element.closest(".task-display-priority").classList.add("medium");
  }
  if (selectedPriority === "high") {
    element.closest(".task-display-priority").classList.add("high");
  } 
  else{
    return;
  }
}


// Add Task to List Function

function addToList(priority , task , date , status){



    //TaskDisplayCon creating elements and appending them

    let taskDisplayCon = document.createElement("div");
    taskDisplayCon.classList.add("task-display-con")

    let doneIcon = document.createElement("span");
    doneIcon.classList.add("done-icon-con");
    doneIcon.innerHTML = '<i class="fa-solid fa-circle-notch done-icon"></i>'

    let liTask = document.createElement("li");
    liTask.classList.add("task");

    let taskDisplayImportants = document.createElement("div");
    taskDisplayImportants.classList.add("task-display-imp");

    let taskDelete = document.createElement("span");
    taskDelete.classList.add("delete");

    let impCon = document.createElement("div");
    impCon.classList.add("imp-con");

    let TaskPriority = document.createElement("span");
    TaskPriority.classList.add("task-display-priority");

    if(priority !== ""){
      TaskPriority.innerText = "#" + priority;
    }
    else{
      TaskPriority.innerText = "";
    }
   

    let taskDate = document.createElement("span");
    taskDate.classList.add("task-display-date");
    taskDate.innerText = date;
    

    //--Appending these ^

    taskDisplayCon.append(doneIcon)
    taskDisplayCon.append(liTask);
    liTask.innerText = task;
    taskDisplayCon.append(taskDisplayImportants);

    taskDisplayImportants.append(taskDelete)
    taskDisplayImportants.append(impCon)
    impCon.append(TaskPriority);
    impCon.append(taskDate);
    

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
    @media screen and (max-width: 992px){
      input[type="radio"]:checked + label[for="${uniqueId1}"]:before,
      input[type="radio"]:checked + label[for="${uniqueId2}"]:before,
      input[type="radio"]:checked + label[for="${uniqueId3}"]:before{
        height: 3.5px;
        width: 3.5px;
        border: 2px solid black;
      }
      label[for="${uniqueId1}"]:before,label[for="${uniqueId2}"]:before,label[for="${uniqueId3}"]:before{
        width: 5px;
        height: 5px;
      }
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
      if(editDateSelected.value !== ""){
        taskDate.innerText = editDateSelected.value;
        taskList[index].date = editDateSelected.value;
        this.closest(".task-edit-expand").classList.remove("expand");
        updateLocalStorage("TaskList", taskList);
        console.log(taskList)
      }
      if(typeof editPriorirtySelected !== "undefined"){
        TaskPriority.innerText = "#" + editPriorirtySelected;
        taskList[index].priority = editPriorirtySelected;
        updateLocalStorage("TaskList", taskList);
        checkPriority(editPriorirtySelected, TaskPriority);
        this.closest(".task-edit-expand").classList.remove("expand");
      }
      else{
        this.closest(".task-edit-expand").classList.remove("expand");
        return;
      }

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

    prioritySelect.forEach((radio) => {
      radio.checked = false;
  });
  //Function to check Status and add stlying
  statusCheck(status, doneIcon, liTask)

  //Priority Selected RESET
  priorirtySelected = "";
}
//Done Icon / Status True or False Function

function statusDone(event) {
  if (event.target.classList.contains("done-icon")) {
    let iconDone = event.target;
    let doneTaskElement = event.target.parentNode.parentNode.children[1];
    const taskCon = event.target.closest(".task-con");
    const parentContainer = taskCon.parentNode;
    const taskConList = Array.from(parentContainer.children);
    const statusConIndex = taskConList.indexOf(taskCon);
    taskList[statusConIndex].status = !taskList[statusConIndex].status;
    taskList = statusBottomTask(taskList);
    updateLocalStorage("TaskList", taskList);
    statusCheck(taskList[statusConIndex].status, iconDone, doneTaskElement);
    location.reload();
  }
}

function statusCheck(status, icon, element) {
  let statusTaskCon = element.parentNode.parentNode;
  if (status) {
    icon.style.transform = "rotate(180deg)";
    element.style.textDecoration = "line-through";
  }
  if(!status){
    icon.style.transform = "rotate(0deg)";
    element.style.textDecoration = "none";
  }
}

document.addEventListener("click", statusDone);

//Task List Expanding Function

const expandEditTaskLi = document.querySelector(".task-list");


expandEditTaskLi.addEventListener("click", function (e) {
  
     if (e.target.classList.contains("task")) {
        const taskElement = e.target;
        const taskEditExpand = taskElement.parentNode.nextElementSibling;
        let taskId = taskElement.innerText;
        if (taskEditExpand) {
          taskEditExpand.classList.toggle("expand");
          index = taskList.findIndex((taskObj) => taskObj.task === taskId);
        }
    }
  });


// Deleting a task function

function deleteTask(event) {
  if (event.target.classList.contains("delete")) {
    const taskCon = event.target.closest(".task-con");
    const parentContainer = taskCon.parentNode;
    const taskConList = Array.from(parentContainer.children);
    const delIndex = taskConList.indexOf(taskCon);
    taskList.splice(delIndex, 1);
    taskCon.style.transform = "translateX(200%)";
    updateLocalStorage("TaskList", taskList);
    setTimeout(function() {
      taskCon.remove();
    }, 1600); 
  }
}

document.addEventListener("click", deleteTask);
// window.addEventListener("load", loadTasksFromLocalStorage);


// Update Local Storage on Edit

function updateLocalStorage(key, arr){
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(arr));
}


//Function to Filter Status on Default to be in the bottom

function statusBottomTask(list){
 let taskListTrue = list.filter((task) => task.status === true);
 let taskListFalse = list.filter((task) => task.status === false);
 return taskList = [...taskListFalse, ...taskListTrue];
 window.location.reload()
}


loadTasksFromLocalStorage()
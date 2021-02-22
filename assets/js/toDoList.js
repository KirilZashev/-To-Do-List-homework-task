// let tasks;
class Reminder {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.isChecked = false;
    }
}
// let tasks = {
//     task: []
// }
function removeBtnsAddEventListeners() {
    let buttons = document.querySelectorAll('.remove');
    buttons.forEach((e) => {
        e.addEventListener('click', function () {
            let i = e.id.replace(/^\D+/g, '');
            console.log(i);
            let index = findIndex(tasks.task, i);
            tasks.task.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            templateAdd();
        })
    })
}
function templateAdd() {
    const task = document.getElementById('reminder').innerHTML;
    const template = Handlebars.compile(task);
    const html = template(tasks);
    let main = document.getElementById('mydiv');
    main.innerHTML = html;
    removeBtnsAddEventListeners();
    addListenerToCheckboxes();
}
function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1
}
function addListenerToCheckboxes() {
    let buttons = document.querySelectorAll('[type=checkbox]');
    buttons.forEach((e) => {
        e.addEventListener('click', function () {
            let i = findIndex(tasks.task, Number(e.id));
            console.log(e.id);
            console.log(i);
            tasks.task[i].isChecked = e.checked;
        })
    })
}
function deleteMarked(arr) {
    if (arr.every(e => e.isChecked)) {
        arr.length = 0;
        return
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        console.log('hit');
        if (arr[i].isChecked) {
            arr.splice(i, 1);
            // i = 0;
        }
    }
}
function changeIsCheckedProperty() {
    let inputs = document.querySelectorAll('[type = checkbox]');
    console.log(inputs);
}
window.addEventListener('DOMContentLoaded', () => {
    const ADD_REMINDER = document.getElementById("add");
    const SUBMIT = document.getElementById("submit");
    const list = document.getElementById("mydiv");
    const deleteBtn = document.getElementById("delete");
    let i = 1;    
    templateAdd();
    SUBMIT.addEventListener('click', function (e) {
        e.preventDefault();
        if(ADD_REMINDER.value){
            let currentTask = new Reminder(i, ADD_REMINDER.value);
            tasks.task.push(currentTask);
            templateAdd();
            localStorage.setItem('tasks', JSON.stringify(tasks));//LOCAL STORIGE
            ADD_REMINDER.value = "";
            i++;
        }
        
    })
    deleteBtn.addEventListener('click', function () {
        deleteMarked(tasks.task);
        localStorage.setItem('tasks', JSON.stringify(tasks));//LOCAL STORIGE
        templateAdd();
    });
})






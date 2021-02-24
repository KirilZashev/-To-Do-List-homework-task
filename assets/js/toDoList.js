(function () {
    // NEW TASK CLASS
    class Reminder {
        constructor(id, text) {
            this.id = id;
            this.text = text;
            this.isChecked = false;
        }
    }
    // CONSTANTS FROM HTML
    const ADD_REMINDER = document.getElementById("add");
    const SUBMIT = document.getElementById("submit");
    const deleteBtn = document.getElementById("delete");
    // MODEL
    const TO_DO_MODEL = {
        tasks: {
            task: []
        },
        i: 0,
        // GET DATA FROM LOCAL STORIGE
        getData() {
            if (localStorage.getItem('tasks')) {
                this.tasks = JSON.parse(localStorage.getItem('tasks'));                
            } else {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));                
            }
        },
        // ADD TASK
        addTask(obj) {
            if (obj instanceof Reminder) {                
                this.tasks.task.push(obj);                
                this.i += 1;                
                localStorage.setItem('tasks', JSON.stringify(this.tasks));//LOCAL STORIGE
            }
        },
        // DELETE TASK
        deleteTask(index) {
            this.tasks.task.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        // DELETE MARKED
        deleteMarked() {            
            if (this.tasks.task.every(e => e.isChecked)) {                
                this.tasks.task.length = 0;
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
                return
            }            
            this.tasks.task = this.tasks.task.filter(e => !e.isChecked);            
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
        changeIsCheckedValue(index, newValue){
            this.tasks.task[index].isChecked = newValue;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
    // VIEW
    const TO_DO_VIEW = {
        // TEMPLATE FUNC
        templateAdd(arr) {
            const task = document.getElementById('reminder').innerHTML;
            const template = Handlebars.compile(task);
            const html = template(arr);            
            let main = document.getElementById('mydiv');
            main.innerHTML = html;
            TO_DO_VIEW.removeBtnsAddEventListeners();
            TO_DO_VIEW.addListenerToCheckboxes();
        },
        // CHECKBOXES EVENTLISTENERS
        addListenerToCheckboxes() {
            let buttons = document.querySelectorAll('[type=checkbox]');
            buttons.forEach((e) => {
                let id = Number(e.id);
                e.addEventListener('click', function () {
                    let isChecked = e.checked;
                    TO_DO_CONTROLER.checkboxLogic(id, isChecked);
                });
            });
        },
        // REMOVE BTNS EVENT LISTENERS
        removeBtnsAddEventListeners() {
            let buttons = document.querySelectorAll('.remove')
            buttons.forEach((e) => {
                let i = e.id.replace(/^\D+/g, '');
                e.addEventListener('click', function () {                    
                    TO_DO_CONTROLER.removeButtonLogic(i);
                })
            })
        },
        // SUBMIT BTNS EVENTLISTENRS
        submitButtonAddEventLsitener(btn, input) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (input.value) {
                    TO_DO_CONTROLER.addReminder(input.value.trim());
                }
                input.value = '';
            })
        },
        // DELETE BTNS EVENTS LISTENERS
        deleteButtonAddEventListener(btn) {
            btn.addEventListener('click', TO_DO_CONTROLER.deleteTasks);
        },
    }
    // CONTROLER
    const TO_DO_CONTROLER = {
        // REMOVE BUTTON LOGIC
        removeButtonLogic(id) {
            let index = findIndex(TO_DO_MODEL.tasks.task, id);
            TO_DO_MODEL.deleteTask(index, 1);
            TO_DO_VIEW.templateAdd(TO_DO_MODEL.tasks);
        },
        // CHECKBOX LOGIC
        checkboxLogic(id, buttonValue) {
            let i = findIndex(TO_DO_MODEL.tasks.task, id);                   
            TO_DO_MODEL.changeIsCheckedValue(i, buttonValue);
        },
        // ADD TASK
        addReminder(str) {
            let currentTask = new Reminder(TO_DO_MODEL.i, str);
            TO_DO_MODEL.addTask(currentTask);
            TO_DO_VIEW.removeBtnsAddEventListeners();
            TO_DO_VIEW.templateAdd(TO_DO_MODEL.tasks);
        },
        // DELETE TASK    
        deleteTasks() {
            TO_DO_MODEL.deleteMarked();
            TO_DO_VIEW.templateAdd(TO_DO_MODEL.tasks);
        }
    }
    // UTIL FUNC FOR INDEX
    function findIndex(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return i;
            }
        }
        return -1
    }
    // WINDOW EVENT LISTENERS
    window.addEventListener('DOMContentLoaded', () => {
        console.log('loaded');
        TO_DO_MODEL.getData();
        TO_DO_VIEW.templateAdd(TO_DO_MODEL.tasks);
        TO_DO_VIEW.submitButtonAddEventLsitener(SUBMIT, ADD_REMINDER);
        TO_DO_VIEW.deleteButtonAddEventListener(deleteBtn);
    })
})();



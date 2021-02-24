(function () {
    const ADD_REMINDER = document.getElementById("add");
    const SUBMIT = document.getElementById("submit");
    const deleteBtn = document.getElementById("delete");


    class Reminder {
        constructor(id, text) {
            this.id = id;
            this.text = text;
            this.isChecked = false;
        }
    }
    // CONTROLER
    const TO_DO_CONTROLER = {
        // TEMPLATE FUNC
        templateAdd(arr) {
            const task = document.getElementById('reminder').innerHTML;
            const template = Handlebars.compile(task);
            const html = template(arr);            
            let main = document.getElementById('mydiv');
            main.innerHTML = html;
            TO_DO_CONTROLER.removeBtnsAddEventListeners();
            TO_DO_CONTROLER.addListenerToCheckboxes();
        },
        loadInitialData() {
            TO_DO_MODEL.getData();
        },

        // REMOVE BUTTON LOGIC
        removeButtonLogic(id) {
            let index = findIndex(TO_DO_MODEL.tasks.task, id);
            TO_DO_MODEL.deleteTask(index, 1);
            TO_DO_CONTROLER.templateAdd(TO_DO_MODEL.tasks);
        },
        // CHECKBOX LOGIC
        checkboxLogic(id, buttonValue) {
            let i = findIndex(TO_DO_MODEL.tasks.task, id);
            TO_DO_MODEL.changeIsCheckedValue(i, buttonValue);            
        },
        // ADD TASK
        addReminder(str) {
            str = str.trim();
            let currentTask = new Reminder(TO_DO_MODEL.i, str);
            TO_DO_MODEL.addTask(currentTask);
            TO_DO_CONTROLER.removeBtnsAddEventListeners();
            TO_DO_CONTROLER.templateAdd(TO_DO_MODEL.tasks);
        },
        // DELETE TASK    
        deleteTasks() {
            TO_DO_MODEL.deleteMarked();
            TO_DO_CONTROLER.templateAdd(TO_DO_MODEL.tasks);
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
        }
    }
    // WINDOW EVENT LISTENERS
    window.addEventListener('DOMContentLoaded', () => {
        console.log('loaded');
        TO_DO_CONTROLER.loadInitialData();
        TO_DO_CONTROLER.templateAdd(TO_DO_MODEL.tasks);
        TO_DO_CONTROLER.submitButtonAddEventLsitener(SUBMIT, ADD_REMINDER);
        TO_DO_CONTROLER.deleteButtonAddEventListener(deleteBtn);
    })
})();
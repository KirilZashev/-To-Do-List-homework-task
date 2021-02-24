const TO_DO_MODEL = (function () {
    class UserService {
        constructor() {
            this.tasks = {
                task: []
            };
            this.i = 0;
        };
        // GET DATA FROM LOCAL STORIGE
        getData() {
            if (localStorage.getItem('tasks')) {
                this.tasks = JSON.parse(localStorage.getItem('tasks'));                
            } else {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));                
            }
        };
        // ADD TASK
        addTask(obj) {            
            this.tasks.task.push(obj);            
            this.i += 1;            
            localStorage.setItem('tasks', JSON.stringify(this.tasks));//LOCAL STORIGE            
        };
        // DELETE TASK
        deleteTask(index) {
            this.tasks.task.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        };
        // DELETE MARKED
        deleteMarked() {            
            if (this.tasks.task.every(e => e.isChecked)) {                
                this.tasks.task.length = 0;
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
                return
            }            
            this.tasks.task = this.tasks.task.filter(e => !e.isChecked);            
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        };
        changeIsCheckedValue(index, newValue) {
            this.tasks.task[index].isChecked = newValue;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
    return new UserService
})();

let tasks;
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    
} else {
    tasks = {
        task: []
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById('todo-input')
const addTaskButton = document.getElementById('add-task-btn')
const todoList = document.getElementById('todo-list')
const deleteTask = document.getElementById('Delete-task-btn')


let tasks = JSON.parse(localStorage.getItem('tasks')) || []
tasks.forEach(task => { renderTask(task)
    
});
deleteTask.addEventListener('click', () => {
    
    // Ask the user to confirm this action
    if (confirm("Are you sure you want to delete ALL tasks?")) {
        deleteAllTasks();
    }
    
});

todoInput.addEventListener('keydown', (event) => {
    const taskText = todoInput.value.trim()
    if (event.key === 'Enter') {
        // console.log("Hii")
        const newTask = {
            id:Date.now(),
            text: taskText,
            completed:false
        }
        tasks.push(newTask)
        saveTasks()
        
        
        renderTask(newTask)
        todoInput.value=""
        console.log(tasks);
        }
    });

todoInput.addEventListener('submit',()=>{

    const taskText = todoInput.value.trim()
    if(taskText === "")
        return
    
    const newTask = {
        id:Date.now(),text: taskText,
        completed:false
    
    }
    tasks.push(newTask)
    saveTasks()
    renderTask(newTask)
    todoInput.value=""
    console.log(tasks);
})

addTaskButton.addEventListener('click',()=>{
    const taskText = todoInput.value.trim()
    if(taskText === ""){

        alert("Please enter something")
    }
    

        else{

            const newTask = {
                id:Date.now(),
                text: taskText,
                completed:false
            }
            tasks.push(newTask)
            saveTasks()
            
            
            renderTask(newTask)
            todoInput.value=""
            console.log(tasks);
        }
    
})
function renderTask(task){
    // console.log(task.text);
    console.log(task.text);
    const li = document.createElement('li')
    li.setAttribute('data-id',task.id)
    if(task.completed) li.classList.add('completed')
    li.innerHTML = `<span>${task.text}</span>
    <button>Delete</button>`
    li.addEventListener('click',(e)=>{
if(e.target.tagName==='BUTTON') return 
task.completed = !task.completed
li.classList.toggle('completed')
    })

li.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation()
    console.log("Delete buttong is here");
    
    tasks = tasks.filter(t=>t.id !== task.id)
    li.remove()
    saveTasks()
})



todoList.appendChild(li)
}
function deleteAllTasks(){
    tasks = []
    saveTasks()
    todoList.innerHTML = "" 
}

function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
})
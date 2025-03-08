document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTasks(task));

    addBtn.addEventListener("click", () => {
        const taskText = input.value.trim();
        if(taskText === '') return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask);
        saveTasks();
        renderTasks(newTask);
        input.value = "";
    });

    function renderTasks(task) {
        const li = document.createElement("li");
        li.setAttribute('data-id', task.id);
        if(task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">delete</button>
        `;
        li.addEventListener('click', (e) => {
            if(e.target.classList.contains("delete-btn")) return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        })
        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
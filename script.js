const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && taskInput.value.trim() !== '') {
        tasks.push({
            id: Date.now(),
            text: taskInput.value.trim(),
            completed: false
        });

        taskInput.value = '';
        renderTasks();
    }
});

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );

    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    sortedTasks.forEach(task => {
        const li = document.createElement('li');

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""} />
                <span>${task.text}</span>
            </div>
            <button><span class="material-symbols-rounded">delete</span></button>
        `;

        li.querySelector('input').addEventListener('change', () => {
            toggleTask(task.id);
        });

        li.querySelector('button').addEventListener('click', () => {
            deleteTask(task.id);
        });

        taskList.appendChild(li);
    });
}

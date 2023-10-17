 document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addBtn = document.getElementById("add");
    const taskList = document.getElementById("taskList");

    addBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task before adding.");
        } else {
            addTask(taskText);
        }
    });

    taskInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task before adding.");
            } else {
                addTask(taskText);
            }
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
            saveTasks();
        } else if (e.target.classList.contains("edit")) {
            const taskElement = e.target.parentElement;
            const taskText = taskElement.querySelector("span").textContent;
            const editedText = prompt("Edit the task:", taskText);
            if (editedText !== null) {
                taskElement.querySelector("span").textContent = editedText;
                saveTasks();
            }
        }
    });

    loadTasks();

    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = "";

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll("li");
        taskElements.forEach(function (taskElement) {
            const taskText = taskElement.querySelector("span").textContent;
            tasks.push(taskText);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function (taskText) {
            addTask(taskText);
        });
    }
});

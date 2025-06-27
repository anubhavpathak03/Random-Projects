document.addEventListener('DOMContentLoaded', () => {
    
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        hamburger.classList.toggle('active'); // <-- yeh line add karein
    });
    
    // Sidebar ke bahar click par close ho toh hamburger bhi normal ho
    document.addEventListener('click', (e) => {
        if (
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            e.target !== hamburger &&
            !hamburger.contains(e.target)
        ) {
            sidebar.classList.remove('open');
            hamburger.classList.remove('active'); // <-- yeh line add karein
        }
    });

    
    
    
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    let history = JSON.parse(localStorage.getItem("history")) || [];

    tasks.forEach(task => renderTask(task));
    renderSidebar();

    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim(); // remove extra space
        if(taskText === "") return; 

        const newTask =  { // object
            id: Date.now(),
            text: taskText,
            completed: false,
            date: new Date().toISOString().slice(0, 10) // YYYY-MM-DD format
        };

        tasks.push(newTask); // add task in array
        history.push(newTask);
        saveTasks();
        saveHistory();  
        renderTask(newTask);
        renderSidebar();
        todoInput.value = "";  //clear the input
        console.log(tasks);
    });

    // now we add the task to local storage now we also have to read that task
    function renderTask(task) { 
        // render means display things on DOM
        // console.log(task);

        // here now we render the task and create element from out of it
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        
        if(task.completed) li.classList.add("completed");
        
        
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
        
        li.addEventListener('click', (event) => {
            if(event.target.tagName === 'BUTTON') return
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
            saveHistory(); 
            renderSidebar();
        });
        
        li.querySelector('button').addEventListener('click', (event) => {
            event.stopPropagation() // prevent toggle from firing 
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
            saveHistory(); 
            renderSidebar();
        });
        
        todoList.appendChild(li);   
    }
    
    function renderSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.innerHTML = ""; // sab kuch clear karo

        // Content wrapper
        const content = document.createElement('div');
        content.style.flex = "1 1 auto";
        content.style.overflowY = "auto";
        content.innerHTML = "<h3>Task History</h3>";

        // Group history by date
        const grouped = {};
        history.forEach(task => {
            if (!grouped[task.date]) grouped[task.date] = [];
            grouped[task.date].push(task);
        });
    
        for (const date in grouped) {
            const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
            const dateDiv = document.createElement('div');
            dateDiv.style.cursor = "pointer";
            dateDiv.style.marginBottom = "8px";
            dateDiv.innerHTML = `<strong>${date} (${dayName})</strong>`;
    
            const taskList = document.createElement('div');
            taskList.style.display = "none";
            taskList.style.marginLeft = "10px";
    
            grouped[date].forEach(task => {
                const t = document.createElement('div');
                t.textContent = task.text;
                taskList.appendChild(t);
            });
    
            dateDiv.addEventListener('click', () => {
                taskList.style.display = taskList.style.display === "none" ? "block" : "none";
            });
    
            content.appendChild(dateDiv);
            content.appendChild(taskList);
        }

        // Button
        const clearBtn = document.createElement('button');
        clearBtn.textContent = "Clear History";
        clearBtn.style.marginTop = "20px";
        clearBtn.style.padding = "10px";
        clearBtn.style.background = "#d32f2f";
        clearBtn.style.color = "#fff";
        clearBtn.style.border = "none";
        clearBtn.style.borderRadius = "6px";
        clearBtn.style.cursor = "pointer";
        clearBtn.style.fontWeight = "bold";
        clearBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to clear all history?")) {
                // Clear all localStorage
                localStorage.clear();
                // Clear arrays in memory
                tasks = [];
                history = [];
                // Clear To-Do List from DOM
                todoList.innerHTML = "";
                // Re-render sidebar
                renderSidebar();
            }
        });

        // Add content and button to sidebar
        sidebar.appendChild(content);
        sidebar.appendChild(clearBtn);
    }

        // Now here we move the tasks (means array) to local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function saveHistory() {
        localStorage.setItem('history', JSON.stringify(history));
    }
    
});
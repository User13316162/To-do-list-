document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task');

    // Event listener for form submission (add task)
    document.getElementById('todo-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        const taskName = taskInput.value.trim(); // Get the task name from the input field

        if (taskName !== '') {
            // Call a PHP script to insert the task into the database
            fetch('add_task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'task=' + encodeURIComponent(taskName)
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'success') {
                    addTaskToList(taskName); // Call the addTaskToList function to add the task to the list
                    taskInput.value = ''; // Clear the input field after adding the task
                } else {
                    console.error('Failed to add task:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

    // Event listener for task checkboxes (update task status)
    taskList.addEventListener('change', function(event) {
        if (event.target.classList.contains('task-checkbox')) {
            const taskItem = event.target.closest('li');
            const taskId = taskItem.dataset.id; // Assuming each task item has a unique ID
            const isCompleted = event.target.checked;

            // Call a PHP script to update the task status in the database
            fetch('update_task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: id=${encodeURIComponent(taskId)}&completed=${isCompleted ? '1' : '0'}
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'success') {
                    // Update the UI to reflect the task status change
                    taskItem.classList.toggle('completed', isCompleted);
                } else {
                    console.error('Failed to update task:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

    // Function to fetch tasks from the database and display them on the page
    function fetchTasks() {
        fetch('get_tasks.php') // PHP script to retrieve tasks from the database
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = ''; // Clear the existing task list
            tasks.forEach(task => {
                addTaskToList(task.task_name); // Add each task to the list
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to add a task to the task list
    function addTaskToList(taskName) {
        const listItem = document.createElement('li'); // Create a new list item
        listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-name">${taskName}</span>
            <button class="edit-task-btn">Edit</button>
        `; // Set the HTML content of the list item
        taskList.appendChild(listItem); // Add the list item to the task list
    }

    // Fetch tasks from the database when the page loads
    fetchTasks();
});
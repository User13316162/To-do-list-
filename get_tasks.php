<?php
// Connect to the MySQL database
$host = 'localhost'; // Change this to your database host
$username = 'root'; // Change this to your database username
$password = ''; // Change this to your database password
$database = 'todo_list'; // Change this to your database name
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Prepare an SQL statement to select tasks from the database
$sql = 'SELECT task_name FROM tasks';
$result = $conn->query($sql);

// Check if any tasks were found
if ($result->num_rows > 0) {
    $tasks = array();

    // Loop through each row of the result set
    while ($row = $result->fetch_assoc()) {
        // Add the task name to the tasks array
        $tasks[] = $row;
    }

    // Send the tasks array as JSON data
    echo json_encode($tasks);
} else {
    echo 'error: No tasks found';
}

// Close the database connection
$conn->close();
?>
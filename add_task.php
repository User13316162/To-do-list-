<?php
// Check if the task parameter is set in the POST request
if (isset($_POST['task'])) {
    // Get the task name from the POST request
    $taskName = $_POST['task'];

    // Validate task name (optional)

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

    // Prepare an SQL statement to insert the task into the database
    $sql = 'INSERT INTO tasks (task_name) VALUES (?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $taskName);

    // Execute the SQL statement
    if ($stmt->execute()) {
        echo 'success'; // Send a success response back to the client
    } else {
        echo 'error: ' . $stmt->error; // Send an error response back to the client
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // If the task parameter is not set, send an error response back to the client
    echo 'error: Task parameter is missing';
}
?>
<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){

    $username = $_POST['username'];
    $password = $_POST['password'];


    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if($conn->connect_error){
        die("Connection failed!". $conn->connect_error);

    }

    $query = "SELECT *FROM login WHERE username='$username' AND password='$password'";

    $result = $conn->query($query);

    if($result->num_rows == 1){
        // login success
        header("Location: success.html");
        exit();
    }
    else{
        //login failed
        header("Location: error.html");
        exit();
    }

    $conn->close();
}



?>
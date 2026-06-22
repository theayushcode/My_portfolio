<?php

include 'db.php';

if(isset($_POST['name']))
{

    $name = mysqli_real_escape_string(
        $conn,
        $_POST['name']
    );

    $email = mysqli_real_escape_string(
        $conn,
        $_POST['email']
    );

    $message = mysqli_real_escape_string(
        $conn,
        $_POST['message']
    );

    $sql = "INSERT INTO contacts
            (name,email,message)
            VALUES
            ('$name','$email','$message')";

    if(mysqli_query($conn,$sql))
    {

        echo "
        <h2>
        Message Sent Successfully
        </h2>

        <a href='../index.html'>
        Go Back to Portfolio
        </a>
        ";

    }
    else
    {

        echo "Error";

    }

}

?>
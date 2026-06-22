<?php

include 'db.php';

$sql = "SELECT * FROM contacts ORDER BY id DESC";

$result = mysqli_query($conn,$sql);

?>

<!DOCTYPE html>
<html>
<head>

<title>Admin Panel</title>

<style>

body{
    font-family:Arial;
    background:#0f172a;
    color:white;
    padding:20px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th,td{
    border:1px solid #ddd;
    padding:12px;
}

th{
    background:#38bdf8;
    color:black;
}

tr:nth-child(even){
    background:#1e293b;
}

h1{
    text-align:center;
}

</style>

</head>

<body>

<h1>Contact Messages</h1>

<table>

<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Message</th>
</tr>

<?php

while($row = mysqli_fetch_assoc($result))
{

?>

<tr>

<td><?php echo $row['id']; ?></td>

<td><?php echo $row['name']; ?></td>

<td><?php echo $row['email']; ?></td>

<td><?php echo $row['message']; ?></td>

</tr>

<?php

}

?>

</table>

</body>
</html>
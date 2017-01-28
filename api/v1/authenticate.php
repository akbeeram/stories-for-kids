<?php

/**
 * @author admin
 * @copyright 2015
 */

require 'db_config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$username = $request->username;
$accessToken = $request->accessToken;


    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");    
     
    }else{
        echo 'able to connect to the db ! enjoy !';  
    }
    mysql_close($conn);


?>
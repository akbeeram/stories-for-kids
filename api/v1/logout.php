<?php

/**
 * @author Anil Kumar Beeram
 * @copyright 2017
 */

require 'db_config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;

$conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
if(!$conn){
    die("Unable to connect to MySQL");    

}else{
    $table='usersdata';
    mysql_selectdb(DB_DBNAME);
    $getUserSql='UPDATE '.$table.' SET SESSION_ID="" WHERE EMAIL="'.mysql_real_escape_string($email).'"';
    //echo $getUserSql;
    $getUserSqlResult=mysql_query($getUserSql);
    if(mysql_affected_rows($conn)!=1){
        //handle this scenario
    }else{
        header('Content-type: application/json');
        echo json_encode(array('logoutSuccess'=>true));
    }
}
mysql_close($conn);
?>
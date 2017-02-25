<?php

/**
 * @author Anil Kumar Beeram
 * @copyright 2017
 */

require 'db_config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$name = $request->name;
$comments = $request->comments;

$conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
if(!$conn){
    die("Unable to connect to MySQL");    

}else{
    $table='comments_submitted';
    mysql_selectdb(DB_DBNAME);
    $getCommentsSubmittedSql = 'SELECT MAX(COMMENTS_SUBMITTED_ID) FROM '.$table;
    $getCommentsSubmittedSqlResult=mysql_query($getCommentsSubmittedSql);
    $row = mysql_fetch_row($getCommentsSubmittedSqlResult);
    $highest_id = $row[0];
    $highest_id++;
    $getCommentsSql="INSERT INTO ".$table." (`COMMENTS_SUBMITTED_ID`, `NAME`, `EMAIL`, `COMMENTS`) VALUES (".$highest_id.",'".$name."','".$email."','".$comments."')";
    $getCommentsSqlResult=mysql_query($getCommentsSql);
        header('Content-type: application/json');
    if(mysql_affected_rows($conn)!=1){
        //handle this failure scenario
        echo json_encode(array('commentSubmitted'=>false));
    }else{
        echo json_encode(array('commentSubmitted'=>true));
    }
}
mysql_close($conn);
?>
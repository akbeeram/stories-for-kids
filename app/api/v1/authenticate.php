<?php

/**
 * @author Anil Kumar Beeram
 * @copyright 2017
 */

require 'db_config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$auth_Token = $request->accessToken;


$conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
if(!$conn){
    die("Unable to connect to MySQL");    

}else{
    $table='usersdata';
    mysql_selectdb(DB_DBNAME);
    $getUserSql='SELECT * FROM '.$table.' WHERE EMAIL="'.mysql_real_escape_string($email).'" AND SESSION_ID="'.mysql_real_escape_string($auth_Token).'"';
    $getUserSqlResult=mysql_query($getUserSql);
    if(mysql_num_rows($getUserSqlResult)==1){
        while ($row=mysql_fetch_assoc($getUserSqlResult)){
            header('Content-type: application/json');
            echo json_encode(setUserToJson($row));
        }
    } else {
        echo json_encode(array('isAuthenticatedUser'=>false));
    } 
}
mysql_close($conn);

function setUserToJson($tableRow){
    return array('username'=>$tableRow['USERNAME'],'email'=>$tableRow['EMAIL'],'accountLocked'=>$tableRow['ACCLOCKED'],'accessToken'=>$tableRow['SESSION_ID'],'userRole'=>$tableRow['USER_ROLE'],'lastLoginDate'=>$tableRow['LAST_LOGIN_DATE'],'secQsSet'=>$tableRow['SEC_QS_SET'],'isAuthenticatedUser'=>true);
    //return $data;
}
?>
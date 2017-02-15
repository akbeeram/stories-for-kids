<?php

/**
 * @author Anil Kumar Beeram
 * @copyright 2017
 */

require 'db_config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$password = $request->password;


$conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
if(!$conn){
    die("Unable to connect to MySQL");    

}else{
    $table='usersdata';
    mysql_selectdb(DB_DBNAME);
    $getUserSql='SELECT * FROM '.$table.' WHERE EMAIL="'.mysql_real_escape_string($email).'" AND PASSWORD="'.md5(mysql_real_escape_string($password)).'"';
    //echo $getUserSql;
    $getUserSqlResult=mysql_query($getUserSql);
    //echo $getUserSqlResult;
    if(mysql_num_rows($getUserSqlResult)==1){
        while ($row=mysql_fetch_assoc($getUserSqlResult)){
            if(empty($row['SESSION_ID'])){
                //echo "empty";
                $setTokenSql='UPDATE '.$table.' SET SESSION_ID="'.randomString().'" WHERE EMAIL="'.mysql_real_escape_string($email).'"';
                $setTokenSqlResult=mysql_query($setTokenSql);
                if(mysql_affected_rows($conn)!=1){
                    //echo "set token again";
                }else{
                    $getUserSqlResult2=mysql_query($getUserSql);
                    //echo $getUserSqlResult2;
                    while($row2=mysql_fetch_assoc($getUserSqlResult2)){
                        header('Content-type: application/json');
                        echo json_encode(setUserToJson($row2));
                    }
                }
            }else{
                //$user=new User($row['USERNAME'],$row['ACC_LOCKED'],$row['ACCESS_TOKEN'],$row['USER_ROLE']);
                header('Content-type: application/json');
                echo json_encode(setUserToJson($row));
            }
        }
    } else {
        echo json_encode(array('loginSuccess'=>false,'loginError'=>'Username of password does not match our records.'));
    } 
}
mysql_close($conn);

function setUserToJson($tableRow){
    return array('username'=>$tableRow['USERNAME'],'email'=>$tableRow['EMAIL'],'accountLocked'=>$tableRow['ACCLOCKED'],'accessToken'=>$tableRow['SESSION_ID'],'userRole'=>$tableRow['USER_ROLE'],'lastLoginDate'=>$tableRow['LAST_LOGIN_DATE'],'secQsSet'=>$tableRow['SEC_QS_SET'],'loginSuccess'=>true,'isAuthenticatedUser'=>true);
    //return $data;
}

function randomString() {
	$str = "";
    $length = 12;
	$characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
	$max = count($characters) - 1;
	for ($i = 0; $i < $length; $i++) {
		$rand = mt_rand(0, $max);
		$str .= $characters[$rand];
	}
	return $str;
}
?>
<?php

/**
 * @author admin
 * @copyright 2015
 */

require 'db_config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$function = $request->call;
if(function_exists($function)){
    call_user_func($function,$request);
}

function userExists($request){
$table='USERSDATA';
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL"); 
    }else{
        mysql_selectdb(DB_DBNAME);
        $email = $request->email;
        $getUserSql='SELECT * FROM '.$table.' WHERE EMAIL="'.$email.'"';
        $getUserSqlResult=mysql_query($getUserSql);
        if(mysql_num_rows($getUserSqlResult)==1){
            echo json_encode(array('userExists'=>true));
        }else{
            echo json_encode(array('userExists'=>false));
        }
    }
    mysql_close($conn);
}

function sendResetMail($request){
$table='usersdata';
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");
    }else{
        mysql_selectdb(DB_DBNAME);
        $email = $request->email;
        $tempPwd = randomString();

        $getUserSql='UPDATE '.$table.' SET PASSWORD="'.md5($tempPwd).'"  WHERE EMAIL="'.$email.'"';
        $getUserSqlResult=mysql_query($getUserSql);
        //echo $getUserSql;
        //echo json_encode(array('sentResetEmail'=>$getUserSqlResult));
        if(mysql_affected_rows($conn)!=1){
            echo json_encode(array('sentResetEmail'=>false));
        }else{
            //HTML email
            $msg = '<html><head><title>Your Password hase been Reset</title></head>';
            $msg .= '<body style="font-family:Verdana">';
            //$msg .= "Your temporary password is : '".$tempPwd."'.";
            $msg .= '<div style="background-color:#1B242D;padding:25px;width:100%;color:white;">';
            $msg .= '<div style="font-weight:bold;font-size:1.5em;">Stories for <span style="color:crimson;font-style:italic;">Kids</span></div>';
            $msg .= '<div style="font-size:0.7em;">Moral, Motivational and Inspirational Stories</div></div>';
            $msg .= '<h3 style="color:#1B242D;">Your Password has been reset</h3>';
            $msg .= '<p>Hi There !!</p>';
            $msg .= '<p>Use the temporary password to login into <a href="storiesforkids.in" style="font-weight:bold;text-decoration:none;color:crimson;">';
            $msg .= 'Stories for Kids</a> and reset your password once you login.</p>';
            $msg .= '<p>Your temporary password is : '.$tempPwd.'</p>';
            $msg .= '<p><br><br><br>Thanks,<br>';
            $msg .= '<span style="font-weight:bold;">Stories for Kids</span><br>';
            $msg .= '<span style="font-size:0.8em;">support@storiesforkids.in</span></p>';
            $msg .= '</body></html>';

            // To send HTML mail, the Content-type header must be set
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            // Additional headers
            $headers .= 'From: Storiesforkids <support@storiesforkids.in>' . "\r\n";
            $headers .= 'Reply-To: Storiesforkids <support@storiesforkids.in>' . "\r\n";

            //send mail
            mail($email,"Password Reset for storiesforkids.in",$msg,$headers);
            echo json_encode(array('sentResetEmail'=>true));
        }
    }
    mysql_close($conn);
}

function isUserUnique($request){
$table='usersdata';
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");
    }else{
        mysql_selectdb(DB_DBNAME);
        $email = $request->email;
        $getUserSql='SELECT * FROM '.$table.' WHERE EMAIL="'.$email.'"';
        //echo $getUserSql;
        $getUserSqlResult=mysql_query($getUserSql);
        //echo json_encode(array('sentResetEmail'=>$getUserSqlResult));
        if($getUserSqlResult != false && mysql_num_rows($getUserSqlResult)>0){
            echo json_encode(array('isUserUnique'=>false));
        }else{
            echo json_encode(array('isUserUnique'=>true));
        }
    }
    mysql_close($conn);
}

function createUser($request){
    $table='usersdata';
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL"); 
    }else{
        $username = $request->username;
        $password = $request->password;
        $email = $request->email;

        mysql_selectdb(DB_DBNAME);
        $createUserSql="INSERT INTO ".$table." (EMAIL,USERNAME,PASSWORD,ACCLOCKED,SESSION_ID) VALUES ('".$email."','".mysql_real_escape_string($username)."','".md5(mysql_real_escape_string($password))."','N','".randomString()."')";
        //echo $createUserSql;
        $createUserSqlResult=mysql_query($createUserSql);
            //echo json_encode(array('data'=>$createUserSql)); 
        header('Content-type: application/json');
        if(mysql_affected_rows($conn)!=1){
            echo json_encode(array('registerStatus'=>false));    
        }else{
            $getUserSql='SELECT * FROM '.$table.' WHERE EMAIL="'.$email.'"';
            $getUserSqlResult=mysql_query($getUserSql);
            while ($row=mysql_fetch_assoc($getUserSqlResult)){
                echo json_encode(setUserToJson($row));
            }
        }
    }
    mysql_close($conn);
}

function setUserToJson($tableRow){
    return array('registerStatus'=>true,'username'=>$tableRow['USERNAME'],'email'=>$tableRow['EMAIL'],'accountLocked'=>$tableRow['ACCLOCKED'],'accessToken'=>$tableRow['SESSION_ID'],'userRole'=>$tableRow['USER_ROLE'],'lastLoginDate'=>$tableRow['LAST_LOGIN_DATE'],'secQsSet'=>$tableRow['SEC_QS_SET'],'loginSuccess'=>true,'isAuthenticatedUser'=>true);
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
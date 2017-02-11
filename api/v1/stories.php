<?php

/**
 * @author Anil Kumar Beeram
 * @copyright 2017
 */

require 'db_config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->call;
if(function_exists($function)){
    call_user_func($function,$request);
}

function getStoriesList($request){
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");    
    }else{
        $table='STORIES';
        mysql_selectdb(DB_DBNAME);
        $getStoriesSql='SELECT * FROM '.$table;
        $getStoriesSqlResult=mysql_query($getStoriesSql);
        $count=0;
        $response=array(); 
        while ($row=mysql_fetch_assoc($getStoriesSqlResult)){
            $response[$count]=setStoryToJson($row);
            $count++;
        }
        header('Content-type: application/json');
        echo json_encode($response);
    }
    mysql_close($conn);
}

function setStoryToJson($tableRow){
    return array('story_id'=>$tableRow['STORY_ID'],'story_name'=>$tableRow['STORY_NAME'],'story_sec'=>$tableRow['STORY_SECTION'],'story_cat_id'=>$tableRow['STORY_CATEGORY_ID'],'story_html_name'=>$tableRow['STORY_HTML_NAME']);
    //return $data;
}
?>
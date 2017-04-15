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
function getStory($request){
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");    
    }else{
        mysql_selectdb(DB_DBNAME);
        $storyId = $request->storyId;
        $table='stories';
        $getStorySql="SELECT STORY FROM ".$table." WHERE STORY_ID='".$storyId."'";
        //echo $getStorySql;
        $getStorySqlResult=mysql_query($getStorySql);
        //echo $getStorySqlResult;
        while ($row=mysql_fetch_assoc($getStorySqlResult)){
                echo json_encode(array('story'=>htmlspecialchars_decode($row['STORY'])));
            }
        echo mysql_error();
    }
    mysql_close($conn);
}
function updateStory($request){
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");    
    }else{
        mysql_selectdb(DB_DBNAME);
        $story = $request->story;
        $table='stories';
        $createStorySql="UPDATE ".$table." SET STORY='".htmlspecialchars($story)."' WHERE STORY_ID='ST0001'";
        //echo $createStorySql;
        $createStorySqlResult=mysql_query($createStorySql);
        //echo $createStorySqlResult;
        //echo mysql_error();
    }
    mysql_close($conn);
}
function getStoriesList($request){
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");    
    }else{
        $cat_id = $request->category;
        $table='stories';
        mysql_selectdb(DB_DBNAME);
        $getStoriesSql='SELECT * FROM '.$table.' WHERE STORY_CATEGORY_ID="'.$cat_id.'" ORDER BY "STORY_SECTION"';
        $getStoriesSqlResult=mysql_query($getStoriesSql);
        //echo $getStoriesSqlResult;
    echo mysql_error();
        $count=0;
        $response=array(); 
        $list = array();
        header('Content-type: application/json');
        while ($row=mysql_fetch_assoc($getStoriesSqlResult)){
            if(isset($row['STORY_SECTION'])){
                $key = $row['STORY_SECTION'];
                //if key exists in the array
                if(array_key_exists($key,$list)){
                    array_push($list[$key],setStoryToJson($row));
                }else{  //if key is not present in array, add the key
                    $list[$key] = array();
                    array_push($list[$key],setStoryToJson($row));
                }
            }else{
                $response[$count]=setStoryToJson($row);
                $count++;
            }
        }
        $response['story_list'] = $list;
        if($count == 0){
            $response['hasCategories'] = true;
        }else{
            $response['hasCategories'] = false;
            
        }
        echo json_encode($response);
    }
    mysql_close($conn);
}
function setStoryToJson($tableRow){
    return array('story_id'=>$tableRow['STORY_ID'],'story_name'=>$tableRow['STORY_NAME'],'story_sec'=>$tableRow['STORY_SECTION'],'story_cat_id'=>$tableRow['STORY_CATEGORY_ID'],'story_html_name'=>$tableRow['STORY_HTML_NAME']);
}
?>
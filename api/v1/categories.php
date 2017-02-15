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

function getCategoryInfo($request) {
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");
    }else{
        $table='CATEGORIES';
        mysql_selectdb(DB_DBNAME);
        $getCategorySql = 'SELECT * FROM '.$table.' WHERE CATEGORY_ID="'.$request->cat_code.'"';
        $getCategorySqlResult = mysql_query($getCategorySql);
        while($row=mysql_fetch_assoc($getCategorySqlResult)){
            header('Content-type: application/json');
            echo json_encode(setTableRowToArray($row));
        }
        mysql_close($conn);
    }
}
function getCategories($request) {
    $conn = mysql_connect(DB_HOST,DB_USERNAME,DB_PASSWORD);
    if(!$conn){
        die("Unable to connect to MySQL");
    }else{
        $table='CATEGORIES';
        mysql_selectdb(DB_DBNAME);
        $getCategoriesSql = 'SELECT * FROM '.$table.' ORDER BY CATEGORY_ID';
        $getCategoriesSqlResult = mysql_query($getCategoriesSql);
        $count=0;
        $response=array();
        while($row=mysql_fetch_assoc($getCategoriesSqlResult)){
            header('Content-type: application/json');
            $response[$count]=setTableRowToArray($row);
            $count++;
        }
        echo json_encode($response);
        mysql_close($conn);
    }
}

function setTableRowToArray($tableRow) {
    return array('categoryId'=>$tableRow['CATEGORY_ID'],'categoryName'=>$tableRow['CATEGORY_NAME'],'categoryDesc'=>$tableRow['CATEGORY_DESC'],'noOfStories'=>$tableRow['NO_OF_STORIES'],'categoryImgLoc'=>stripslashes($tableRow['CATEGORY_IMG_LOC']));
}
?>
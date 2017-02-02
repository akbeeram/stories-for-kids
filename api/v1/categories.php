<?php

/**
 * @author Anil Kumar Beeram
 * @copyright 2017
 */

require 'db_config.php';   
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
            $response[$count]=array('categoryId'=>$row['CATEGORY_ID'],'categoryName'=>$row['CATEGORY_NAME'],'categoryDesc'=>$row['CATEGORY_DESC'],'noOfStories'=>$row['NO_OF_STORIES'],'categoryImgLoc'=>stripslashes($row['CATEGORY_IMG_LOC']));
            $count++;
        }
        mysql_close($conn);
        echo json_encode($response);
    }
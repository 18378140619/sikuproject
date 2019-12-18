<?php
  header("Content-type:text/html;charset=utf-8");
  //连接数据库
  $db = mysqli_connect("127.0.0.1","root","","siku");
  // var_dump($db);
  $type = $_REQUEST["type"];
  $msg= $_REQUEST["msg"];
  $n= $_REQUEST["n"];
  if($type=="0"){     
      $sql = "SELECT * FROM cart";
      
      $result = mysqli_query($db,$sql);

      $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
 
      echo json_encode($data,true);
  }
  else if($type=="add")
  {
     $sql1="UPDATE  `siku`.`cart` SET  `number` =  $n WHERE id = $msg";
     mysqli_query($db,$sql1);
     $sql = "SELECT * FROM cart";
     $result = mysqli_query($db,$sql);
     $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
     echo json_encode($data,true); 
  }
  else if($type=="deleteone"){
    $sql2 = "DELETE FROM `siku`.`cart` WHERE id = $msg";
    mysqli_query($db,$sql2);
    $sql = "SELECT * FROM cart";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);
  }
  // else if($type=="clear-all"){
  //   $sql3="truncate table `siku`.`cart`"
  // }

?>
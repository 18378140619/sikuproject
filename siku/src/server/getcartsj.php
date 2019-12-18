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
  if($type=="add")
  {
     $sql1="UPDATE  `siku`.`cart` SET  `number` =  $n WHERE  `cart`.`msg` =$msg";
    //  $res = $db->query($sql1);
  //    $data = $res->fetch_all(MYSQLI_ASSOC);
  //   //  $sql = "SELECT * FROM cart";
  //   //  $result = mysqli_query($db,$sql);
  //   //  $data = mysqli_fetch_all($result,MYSQLI_ASSOC);  
  //    echo json_encode($data,true);
  }


?>
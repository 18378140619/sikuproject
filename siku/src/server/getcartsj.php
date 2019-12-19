<?php
  header("Content-type:text/html;charset=utf-8");
  //连接数据库
  $db = mysqli_connect("127.0.0.1","root","","siku");
  // var_dump($db);
  $type = $_REQUEST["type"];
  $user_id= $_REQUEST["user_id"];
  $good_id= $_REQUEST["good_id"];
  $n=$_REQUEST["n"];
  if($type=="0"){     
      $sql = "SELECT cart.*,goods.name,goods.src,goods.price FROM cart , goods WHERE cart.good_id = goods.id  and cart.id=$user_id";
      $result = mysqli_query($db,$sql);
      $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
      echo json_encode($data,true);
  }
  else if($type=="add")
  {
     $sql1="UPDATE  `siku`.`cart` SET  `number` = $n WHERE good_id = $good_id and id=$user_id";
     mysqli_query($db,$sql1);
     $sql = "SELECT cart.*,goods.name,goods.src,goods.price FROM cart , goods WHERE cart.good_id = goods.id  and cart.id=$user_id";
      $result = mysqli_query($db,$sql);
      $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
      echo json_encode($data,true); 
  }
  else if($type=="deleteone"){
    $sql2 = "DELETE FROM `siku`.`cart` WHERE good_id = $good_id and id=$user_id";
    mysqli_query($db,$sql2);
    $sql = "SELECT cart.*,goods.name,goods.src,goods.price FROM cart , goods WHERE cart.good_id = goods.id  and cart.id=$user_id";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true); 
  }
  else if($type=="remove-batch"){
    $good_id = explode(",",$good_id);
    $num = count($good_id);//$msg是字符串 不是对象;
    echo $good_id;
    for ($i=0; $i<$num; $i++) {
          $sql3 = "DELETE FROM `siku`.`cart` WHERE good_id =$good_id[$i] and id=$user_id";
          mysqli_query($db,$sql3);
       } 
       $sql = "SELECT cart.*,goods.name,goods.src,goods.price FROM cart , goods WHERE cart.good_id = goods.id  and cart.id=$user_id";
       $result = mysqli_query($db,$sql);
       $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
       echo json_encode($data,true); 
  }

?>
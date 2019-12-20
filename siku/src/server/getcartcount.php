<?php
  header("Content-type:text/html;charset=utf-8");
  $user_id = $_REQUEST["user_id"];

   $obj = array("status"=>"", "data"=>array("msg"=>"","count"=>""));
   $db = mysqli_connect("127.0.0.1","root","","siku");
   //拿总数量
   $sql="SELECT sum(number) FROM cart WHERE id=$user_id";
   $result = mysqli_query($db,$sql);
   $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
   $obj["status"] = "success";
   $obj["data"]["msg"] = "加入购物车成功！！！";
   $obj["data"]["count"] = $data[0]["sum(number)"];
   echo json_encode($obj,true);
?>
<?php
  header("Content-type:text/html;charset=utf-8");
  # 插入一行数据到数据库中的SQL语句
  # INSERT INTO `user` (`id`, `username`, `password`, `phone`) VALUES ('1', 'zs', '123456', '18681538888');
  # 查询user表中的所有数据
  # SELECT * FROM user
  # 查询user表中的所有的username
  # SELECT username FROM user
  # 查询user表中username等于zs的这一条数据
  # SELECT * FROM user WHERE username="zs";
  # 注册
  # (1) 检查数据库中指定的用户名是否存在，如果存在那么返回错误信息(注册失败，用户名已经被使用！)
  # (2) 如果该用户名在数据库不存在，那么就往数据库中插入一条数据，并且返回注册成功！
  
  # 获取客户端提交的参数
  $src = $_REQUEST["src"];
  $name = $_REQUEST["name"];
  $price = $_REQUEST["price"];
  $obj = array("status"=>"", "data"=>array("msg"=>""));
  $db = mysqli_connect("127.0.0.1","root","","siku");
  $sql = "INSERT INTO `cart` (`id`, `src`, `name`,`price`) VALUES (null, '$src', '$name',$price)";
  $result = mysqli_query($db,$sql);
    $obj["status"] = "success";
    $obj["data"]["msg"] = "加入购物车成功！！！";
  echo json_encode($obj,true);
?>
<?php
  # 加载文件数据
  header("Content-type:text/html;charset=utf-8");
  //连接数据库
  $db = mysqli_connect("127.0.0.1","root","","siku");
  //获取参数
  var_dump($db);
//   $type = $_REQUEST["sortType"];
  $json = file_get_contents("list.json");
  echo $json;
?>
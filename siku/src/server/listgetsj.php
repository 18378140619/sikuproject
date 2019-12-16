<?php
  # 加载文件数据
  header("Content-type:text/html;charset=utf-8");
  //连接数据库
  $db = mysqli_connect("127.0.0.1","root","","siku");
  //获取参数
  $page = ($_REQUEST["page"] -1 ) * 20;
  $type = $_REQUEST["sortType"];

if($type == "0")
{
  $sql = "SELECT * FROM goods LIMIT $page, 20";
}elseif($type == "1")
{
  // SELECT * FROM `goods` ORDER BY `goods`.`price` DESC
  $sql = "SELECT * FROM goods ORDER BY goods.price  DESC LIMIT $page, 20";
}elseif($type == "2")
{
  $sql = "SELECT * FROM goods ORDER BY goods.price  ASC LIMIT $page, 20";
}
$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>
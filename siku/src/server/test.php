<?php

# INSERT INTO `goods` (`good_id`, `src`, `title`, `price`, `disCount`, `shopName`) VALUES ('1', 'e32r', '32425', '3434', '3242', '2342452');
header("Content-type:text/html;charset=utf-8");
# 01 链接数据库
$db = mysqli_connect("127.0.0.1","root","","siku");
// print_r($db);
// var_dump($db)
# 02 插入数据
# 加载JSON数据
$jsonData = file_get_contents("list.json");
# 把JSON数据转换PHP数组
$data = json_decode($jsonData,true);
// print_r(count($data));
# 通过for循环遍历数组
for($i = 0;$i<count($data);$i++)
{
  // print_r($data[$i]);
  $src = $data[$i]["src"];
  $name = $data[$i]["name"];
  $price = $data[$i]["price"];
  $sql = "INSERT INTO `goods` (`id`,`src`,`name`, `price`) 
        VALUES (null, '$src', `$name`, $price)";
  mysqli_query($db, $sql);
}

?>
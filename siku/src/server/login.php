<?php
header("Content-type:text/html;charset=utf-8");
# zs 123
# 001 先连接数据库
$db = mysqli_connect("127.0.0.1","root","","siku");
# 002 先获取用户提交的用户名和密码
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
# 003 根据获取的数据去数据库中进行对比(匹配)
$sql = "SELECT * FROM user WHERE username = '$username'";
$result = mysqli_query($db, $sql);
# (1) 先检查数据库是否存在指定的用户名,如果没有那么就返回 提示(该用户不存在)
if (mysqli_num_rows($result) == 0)
{
  $response["status"] = "error";
  $response["msg"] = "该用户不存在！！";
  echo json_encode($response, true);
}else{
  # (2) 如果用户存在，那么继续检查密码是否正确，如果不正确，提示(密码不正确)
  $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $data=$data[0];
  // $data = mysqli_free_result($result); 
  if($data["password"] != $password)
  {
    $response["status"] = "error";
    $response["msg"] = "密码不正确！！";
    echo json_encode($response, true);
  }else{
  # (3) 如果用户名和密码都匹配那么就 提示登录成功 => 跳转到首页
    $userId = $data["id"];
    $response["status"] = "success";  
    $response["msg"] = "登录成功";
    $response["userId"] = $userId;
    $response["password"] = $password;
    $response["username"] = $username;
    echo json_encode($response, true);
  }
}

?>
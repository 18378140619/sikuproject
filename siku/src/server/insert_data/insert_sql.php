<?php
	// include './config.php';
	// 关闭php的错误提示
	error_reporting(0);
	$config = $_REQUEST;
	$config['field'] = explode(",", $config['field']);
	// var_dump($config);
	$config['data_url'] = $_FILES['file']['tmp_name'];
	// 连接数据库
	$conn = new mysqli($config["host"], $config["username"], $config["password"], $config["database"]);
	// 连接失败终止程序
	if(!$conn){
		echo die('数据库连接失败'.mysql_error());
	}
	// 读取文件
	$json = file_get_contents($config["data_url"]);
	// 把json字符串转换为对象
	$json = json_decode($json);
	$res = true;
	$sql = "INSERT INTO {$config['table']} VALUES";
	for($i = 0; $i<count($json); $i++){
		 $sql .= "(";
		for($j = 0; $j < count($config['field']); $j++){
			if($config['field'][$j] == "null"){
				$sql .= "NULL". ',';
			}else {
				if($j == count($config['field'])-1){
					$sql .= '"'.$json[$i]->$config['field'][$j].'"';
				}else {
					$sql .= '"'.$json[$i]->$config['field'][$j].'",';
				}
			}
		}
		$sql .= "), ";
	}
		$sql = substr($sql, 0, -2);
		$res = $conn->query($sql);
		if(!$res){
			echo "插入数据失败";
		} else {
			echo "插入数据成功";
		}
?>

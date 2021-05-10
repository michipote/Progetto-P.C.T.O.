<?php
include_once "./config.php";
$stmt = $pdo->query("SELECT * FROM sede ORDER BY nome");
$result = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $result[$row['nome']][] = ['id' => $row['id'], 'value'=> $row['indirizzo'], 'label'=> $row['indirizzo']];
}
echo json_encode($result);

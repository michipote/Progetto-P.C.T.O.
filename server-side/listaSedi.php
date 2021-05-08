<?php
include_once "./config.php";
$stmt = $pdo->query("SELECT nome, indirizzo FROM sede ORDER BY nome");
$result = array();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $result[$row['nome']][] = ['value'=> $row['indirizzo'], 'label'=> $row['indirizzo']];
}
echo json_encode($result);

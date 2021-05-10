<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$data = [
    'fiscale' => $_POST['codice'],
    'sede' => $_POST['sede']
];
$sql = "INSERT INTO assegnato (data, fk_staff, fk_sede) VALUES (current_date(), (
SELECT account.id FROM account WHERE account.fiscale = :fiscale LIMIT 1
), :sede)";
$pdo->prepare($sql)->execute($data);
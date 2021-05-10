<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM account WHERE email = :email LIMIT 0, 1";
$stmt = $pdo->prepare($sql);
$stmt->execute(['email' => $email]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$result) {
    echo '{"result" : "failed"}';
    exit(0);
}
$pw_hash = $result['password'];

if($result['tipo'] == 1){
    if (password_verify($password, $pw_hash)) {
        $account = $result['id'];
        $sql = "SELECT * 
FROM sede, assegnato 
WHERE sede.id = assegnato.fk_sede 
AND '$account' = assegnato fk_staff
ORDER BY assegnato.data DESC 
LIMIT 0, 1";
        $stmt = $pdo->query($sql);;
        $result['sede'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } else {
        echo '{"result" : "failed"}';
    }
}

if (password_verify($password, $pw_hash)) {

    echo json_encode($result);
} else {
    echo '{"result" : "failed"}';
}
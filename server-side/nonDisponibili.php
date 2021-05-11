<?php
include_once "./config.php";
$_POST = json_decode(file_get_contents("php://input"), true);
$sede = $_POST['sede'];
$sql = "
SELECT data,  count(*) as occupati
FROM prenotazione, sede
WHERE stato != 2
AND sede.id = '$sede'
GROUP BY data
HAVING occupati >= 3 
    OR ( DATEDIFF(data, CURRENT_DATE()) < 3 AND DATEDIFF(data, CURRENT_DATE()) > 11)
";
$stmt = $pdo->query($sql);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

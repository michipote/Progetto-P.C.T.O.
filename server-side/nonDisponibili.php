<?php
include_once "./config.php";
//$_POST = json_decode(file_get_contents("php://input"), true);

//TODO Fare Join con la sede e tornare le date NON DISPONIBILI in base alla sede
$sql = "
SELECT data,  count(*) as occupati
FROM prenotazione
WHERE stato != 2
GROUP BY data
HAVING occupati >= 3 
    OR ( DATEDIFF(data, CURRENT_DATE()) < 3 AND DATEDIFF(data, CURRENT_DATE()) > 11)
";

//$stmt = $pdo->prepare($sql);
//$result = $stmt->execute([]);
$stmt = $pdo->query($sql);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

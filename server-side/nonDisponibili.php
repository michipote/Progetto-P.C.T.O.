<?php
include_once "./config.php";
$stmt = $pdo->query("SELECT data,  count(*) as occupati
FROM prenotazione
WHERE stato != 2
GROUP BY data
HAVING occupati >= 3
   AND DATEDIFF(data, CURRENT_DATE()) > 3
   AND DATEDIFF(data, CURRENT_DATE()) < 11");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

<?php $this->layout('main', ['argomento' => 'Lista delle prenotazioni']); ?>

<h1>Ciao <?=$username?></h1>
<table style="width: 100%">
    <tr>
        <th>ID</th>
        <th>Codice fiscale</th>
        <th>Data</th>
        <th>Codice prenotazione</th>
    </tr>
    <?php foreach($result as $row): ?>
    <tr>
        <td><?php echo $row['id'] ?></td>
        <td><?php echo $row['codice_fiscale'] ?></td>
        <td><?php echo $row['giorno'] ?></td>
        <td><?php echo $row['codice_prenotazione'] ?></td>
    </tr>
    <?php endforeach ?>
</table>
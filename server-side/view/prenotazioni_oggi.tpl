<?php $this->layout('main', ['argomento' => 'Lista delle prenotazioni di oggi: ' . date("d/m/Y")]); ?>

<table class="uk-table uk-table-divider uk-table-middle uk-table-hover uk-overflow-auto .uk-table-justify">
    <thead>
    <tr>
        <th style="font-weight: bold; color: black">Codice fiscale</th>
        <th>Codice prenotazione</th>
        <th>Note</th>
        <th>Eseguito</th>
        <th>Annullato</th>
    </tr>
    </thead>
    <tbody>
    <?php foreach($result as $row): ?>
    <tr>
        <td style="font-weight: bold; color: black"><?php echo $row['codice_fiscale'] ?></td>
        <td><?php echo $row['codice_prenotazione'] ?></td>
        <td><?php echo $row['note'] ?></td>
        <td><?php echo $row['eseguito'] ?></td>
        <td><?php echo $row['annullato'] ?></td>
    </tr>
    <?php endforeach ?>
    </tbody>
</table>
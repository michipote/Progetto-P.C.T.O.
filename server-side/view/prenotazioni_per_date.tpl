<?php $this->layout('main', ['argomento' => 'Numero delle prenotazioni tra ' . $result[0]['giorno'] . " e " . end($result)['giorno']]); ?>

<div id="chartContainer" style="height: 370px; width: 100%;"></div>

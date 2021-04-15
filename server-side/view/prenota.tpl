<?php $this->layout('main', ['argomento' => null]); ?>

<div>
    <h3>Scannerizza il seguente codice QR per ottenere il codice di prenotazione univoco</h3>
    <div style="float: left; width: 150px; height: 150px">
        <div style="display: flex; justify-content: center; align-items: center;">
            <div id="spinner" class="spinner primary"></div>
            <img src="https://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=<?=$codice_prenotazione ?>"
                 onload="onImgLoaded()">
        </div>
    </div>
</div>
<script>
    function onImgLoaded() {
        document.getElementById("spinner").style.display = "none";
    }
</script>
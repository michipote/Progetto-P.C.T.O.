<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tamponi</title>

    <link rel="icon" href="https://www.flaticon.com/svg/vstatic/svg/1504/1504347.svg?token=exp=1618430485~hmac=777cc3fab10a2380c525280cdd619222">
    <!--<link rel="icon" href="https://www.flaticon.com/svg/vstatic/svg/4119/4119177.svg?token=exp=1618430806~hmac=cf6cfd69df2aacb6fdfa8df27d60fc69">-->
    <!--<link rel="icon" href="https://www.flaticon.com/svg/vstatic/svg/4193/4193264.svg?token=exp=1618430281~hmac=1cc4c5f5a17175982592e1f26b41dc1e">-->

    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.6.19/dist/css/uikit.min.css" />

    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.19/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.19/dist/js/uikit-icons.min.js"></script>

    <!-- CanvasJs -->
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
<h1><?= $argomento ?></h1>
<?= $this->section('content') ?>
</body>
</html>
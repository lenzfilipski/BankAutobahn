<?php
  session_start();
  $_SESSION['id'] = $_POST['inputId'];
  $_SESSION['pw'] = $_POST['inputPassword'];
?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php

      echo $_POST['inputId'];
      echo $_POST['inputPassword'] . '<br>';

      if (isset($_POST['inputId']) && isset($_POST['inputPassword'])) {
        echo "OK!";
        $testInput = preg_replace('/[^0-9]/', '', $_POST['inputId']);
        if (strlen($testInput) == 10 && $_POST['inputId'] == $testInput)   {
          echo "iwork<br>";

    ?>

    <script type="text/javascript">
      // Cree un lien websocket secure avec le serveur
      // j'ai remplace le port par '/myws' et mis en place un reverse proxy sur le seveur
      var sock = new WebSocket('wss://bank.filipski.fr/myws');

      // Execute a l'ouverture de la connection avec le serveur ws
      sock.onopen = function (event) {
        console.log('Connected!');

        var acc_id = <?php echo json_encode($_POST['inputId']); ?>;
        var acc_pw = <?php echo json_encode($_POST['inputPassword']); ?>;
        if (typeof acc_id != 'undefined' && typeof acc_pw != 'undefined') {
          sock.send('cote'+acc_id+acc_pw)
        }
      };

      // Gere la reception des messages du serveur ws
      sock.onmessage = function (event) {
        console.log(event.data);

        // Permet de récupérer et de séparer l'ID et le contenu recu du serveur ws
        var message = event.data;
        var id = message.slice(0, 4);
        var content = message.slice(4);

        // Permet d'effectuer differentes actions en fonction de l'ID de la requette
        switch (id) {
          case 'core':
            if (content == 'ok') {
              window.location.replace('test/testping.php');
            } else {
              window.location.replace('connection.php');
            }
            break;

          case 'noca':
            console.log('no valid id for: ' + content);
            break;
        }
      };
    </script>

  <?php
      }
      else {
        ?> <script type="text/javascript">window.location.replace('connection.php');</script> <?php
      };
    }
    else {
      ?> <script type="text/javascript">window.location.replace('connection.php');</script> <?php
    };
  ?>


    <p>Hi
  </body>
</html>

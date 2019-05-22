<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      if (isset($_POST['inputId'], $_POST['inputPassword'])) {
        $_SESSION['id'] = $_POST['inputId'];
        $_SESSION['pw'] = $_POST['inputPassword'];
        $testInput = preg_replace('/[^0-9]/', '', $_POST['inputId']);
        if (strlen($testInput) == 10 && $_POST['inputId'] == $testInput)   {
    ?>

    <script type="text/javascript">
    // fonction pour faire attendre
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

      // Cree un lien websocket secure avec le serveur
      // j'ai remplace le port par '/myws' et mis en place un reverse proxy sur le seveur
      var sock = new WebSocket('wss://ws.bank.filipski.fr:4445');
      //var sock = new WebSocket('ws://localhost:5001');

      // Execute a l'ouverture de la connection avec le serveur ws
      sock.onopen = function (event) {
        console.log('Connected!');

        var acc_id = <?php echo json_encode($_POST['inputId']); ?>;
        var acc_pw = <?php echo json_encode($_POST['inputPassword']); ?>;
        if (typeof acc_id != 'undefined' && typeof acc_pw != 'undefined') {
          sock.send('crea'+acc_id+acc_pw)
        }
      };

      // Gere la reception des messages du serveur ws
      sock.onmessage = async function (event) {
        console.log(event.data);

        // Permet de récupérer et de séparer l'ID et le contenu recu du serveur ws
        var message = event.data;
        var id = message.slice(0, 4);
        var content = message.slice(4);

        // Permet d'effectuer differentes actions en fonction de l'ID de la requette
        switch (id) {
          // verifie la creation du compte par le serveur
          case 'crco':
            if (content == 'ok') {
              document.write('<p><b>Compte Créé</b>. Vous allez être redirigé automatiquement vers votre espace personnel.');
              await sleep(3000);
              window.location.replace('connection.php');
            } else {
              document.write('<p><b>Erreur</b>. Vous allez être redirigé automatiquement vers la page de création de compte.');
              await sleep(3500);
              window.location.replace('creaccount.php');
            }
            break;

          case 'noca':
            console.log('no valid id for: ' + content);
            break;
        }
        sock.close();
      };
    </script>

  <?php
      }
      else {
        ?> <script type="text/javascript">window.location.replace('creaccount.php');</script> <?php
      };
    }
    else {
      ?> <script type="text/javascript">window.location.replace('creaccount.php');</script> <?php
    };
  ?>


    <p>Hi
  </body>
</html>

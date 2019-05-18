<?php session_start();
$_SESSION['loged'] = 'yes'?>
<!DOCTYPE html>
<!-- Page de test pour la mise en place d'un serveur websocket -->
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <!-- <link rel="stylesheet" href="../bootstrap-4.2.1-dist/css/bootstrap.css"> -->
    <link rel="stylesheet" type="text/css" href="../css/style.css">

    <title> Test ping JS</title>
  </head>
  <body>
    <!-- importe pingscript.js -->
    <!-- <script type="text/javascript" src="pingscript_test.js"></script> -->
    <script type="text/javascript">
      // javascript du client / page web
      // console.log(x) permet d'afficher x dans la console
      // a.send(x) permet d'envoyer d'envoyer la chaine x avec la connection a

      // Cree un lien websocket secure avec le serveur
      // j'ai remplace le port par '/myws' et mis en place un reverse proxy sur le seveur
      var sock = new WebSocket('wss://bank.filipski.fr/myws');

      // Execute a l'ouverture de la connection avec le serveur ws
      sock.onopen = function (event) {
        console.log('Connected!');
        sock.send('testHello world!');
        var acc_id = <?php echo json_encode($_POST['inputId']); ?>;
        var acc_pw = <?php echo json_encode($_POST['inputPassword']); ?>;
        if (typeof acc_id != 'undefined' && typeof acc_pw != 'undefined') {
          sock.send('cote'+acc_id+acc_pw)
        };
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
          case 'conn':
            if (content != '1') {
              window.location.replace('../connection.php');
            };
            break;

          // si id == test
          case 'test':
            // affiche le contenu de content dans la balise <output id="enter1">
            document.getElementById('enter1').innerHTML = content;
            break;
        };
      };

      function wsClose() {
        sock.close();
        window.location.replace('../index.html');
      };
    </script>
    <!-- Champ de texte a envoyer au serveur ws -->
    <input type=text class="mt-5" onchange="var tempmes = 'test' + this.value; sock.send(tempmes);">
    <br>
    <p>
      <!-- affiche le content avec id == 'test' recu du serveur ws -->
      OUTPUT: <output type="text" id="enter1" value="" readonly></output>
    </p>

    <button type="button" class="mt-5" name="closeWs" onclick="wsClose()">Disconnect</button>


    <!-- Script loaded after the page -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>


  </body>
</html>

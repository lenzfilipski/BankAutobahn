<?php session_start(); ?>
<!DOCTYPE html>
<!-- Page de test pour la mise en place d'un serveur websocket -->
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <!-- <link rel="stylesheet" href="../bootstrap-4.2.1-dist/css/bootstrap.css"> -->
    <link rel="stylesheet" type="text/css" href="css/style.css">

    <title>Créer un compte</title>
  </head>
  <body>

    <script type="text/javascript">
      // javascript du client / page web
      // console.log(x) permet d'afficher x dans la console
      // a.send(x) permet d'envoyer d'envoyer la chaine x avec la connection a

      // Cree un lien websocket secure avec le serveur
      // j'ai remplace le port par '/myws' et mis en place un reverse proxy sur le seveur
      //var sock = new WebSocket('wss://bank.filipski.fr/myws');
      var sock = new WebSocket('ws://localhost:5001');

      sock.onopen = function (event) {
        console.log('Connected!');
        sock.send('reqi')
      };

      sock.onmessage = function (event) {
        console.log(event.data);

        // Permet de récupérer et de séparer l'ID et le contenu recu du serveur ws
        var message = event.data;
        var id = message.slice(0, 4);
        var content = message.slice(4);

        // Permet d'effectuer differentes actions en fonction de l'ID de la requette
        switch (id) {
          // recoit et affiche l'id envoye par le serveur
          case 'newi':
            document.getElementById('newId').innerHTML = content;
            document.getElementById('idHere').value = content;
            break;

          // si id == test
          case 'test':
            // affiche le contenu de content dans la balise <output id="enter1">
            document.getElementById('enter1').innerHTML = content;
            break;
        };
      };
    </script>

    <div class="container">

      <form class="form-signin mt-5" action="trycreate.php" style="max-width: 330px; margin: auto;" method="post">
        <h2 class="form-signin-heading">Créer un compte</h2>
        <p>ID : <span id="newId"></span></p>
        <input type="hidden" name="inputId" id="idHere">
        <input type="password" name="inputPassword" class="form-control" placeholder="Mot de passe" required autofocus>

        <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">S'enregistrer</button>
      </form>
      <div class="text-center mt-3">
        <a href="connection.php">Déjà un compte? Se connecter.</a>
      </div>

    </div> <!-- /container -->

    <!-- Script loaded after the page -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>


  </body>
</html>

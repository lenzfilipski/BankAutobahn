<?php session_start();
$_SESSION['loged'] = 'yes'?>
<!DOCTYPE html>
<!-- Page de test pour la mise en place d'un serveur websocket -->
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"> -->

    <link rel="stylesheet" href="../bootstrap-4.2.1-dist/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">

    <title> Test ping JS</title>
  </head>
  <body>
    <script type="text/javascript"></script>
    <!-- importe pingscript.js -->
    <script type="text/javascript" src="pingscript_test.js"></script>

    <!-- Champ de texte a envoyer au serveur ws -->
    <input type=text onchange="var tempmes = 'test' + this.value; sock.send(tempmes);">
    <br>
    <p>
      <!-- affiche le content avec id == 'test' recu du serveur ws -->
      OUTPUT: <output type="text" id="enter1" value="" readonly></output>
    </p>


    <!-- Script loaded after the page -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>


  </body>
</html>

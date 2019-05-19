<?php session_start(); ?>
<!DOCTYPE html>
<!-- Page de test pour la mise en place d'un serveur websocket -->
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <!-- <link rel="stylesheet" href="../bootstrap-4.2.1-dist/css/bootstrap.css"> -->
    <link rel="stylesheet" type="text/css" href="css/style.css">

    <title>Se connecter</title>
  </head>
  <body>

    <!-- Header / Entête -->
    <div class="navbar navbar-expand-md fixed-top shadow-sm">
          <a class="navbar-brand active" href="index.html">
            <img src="http://lorempixel.com/output/cats-q-c-640-640-3.jpg" height="30" width="30" class="d-inline-block align-top" alt="Brand logo">
            BankAutobahn
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
          </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav">
            <a href="index.html" class="navbar-item nav-link active">Home <span class="sr-only">(current)</span></a>
            <a href="tryconnection.php" class="nav-item nav-link">Espace personnel</a>
            <a href="informations.html" class="nav-item nav-link">Informations</a>
            <a href="telechargements.html" class="nav-item nav-link">Téléchargements</a>
          </div>
          <button type="button" class="btn btn-secondary ml-auto" data-toggle="modal" data-target="#loginModal">Se connecter</button>
        </div>
      </div>

    <div class="space"></div>
    <div class="container">

      <form class="form-signin mt-5" action="tryconnection.php" style="max-width: 330px; margin: auto;" method="post">
        <h2 class="form-signin-heading">Connectez-vous</h2>
        <input type="text" name="inputId" class="form-control mb-2" placeholder="Identifiant" <?php if (isset($_SESSION['id'])) { echo 'value="'.$_SESSION['id'].'"'; } ?> required autofocus>
        <input type="password" name="inputPassword" class="form-control" placeholder="Mot de passe" required>

        <button class="btn btn-lg btn-primary btn-block mt-4" type="submit">Se connecter</button>
      </form>
      <div class="text-center mt-3">
        <a href="creaccount.php">Pas de compte? En Crér un.</a>
      </div>

    </div> <!-- /container -->

    <!-- Script loaded after the page -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>


  </body>
</html>

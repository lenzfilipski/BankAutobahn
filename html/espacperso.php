<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <!-- <link rel="stylesheet" href="bootstrap-4.2.1-dist/css/bootstrap.css"> -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <title>BankAutobahn - Espace personnel</title>
  </head>
  <body>

    <!-- The light/dark theme switch. Must be placed on top of the main class -->
    <input type="checkbox" id="liSwi">
    <div id="lightSwitch">
      <label for="liSwi"><i class="far fa-lightbulb"></i></label>
    </div>

    <!-- The page to display must be placed here for the light/dark theme switch to work -->
    <div class="main">

      <div class="navbar navbar-expand-sm fixed-top shadow-sm">
        <a class="navbar-brand" href="index.php">
          <img src="http://lorempixel.com/output/cats-q-c-640-640-3.jpg" height="30" width="30" class="d-inline-block align-top" alt="Brand logo">
          BankAutobahn
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav">
            <a href="index.php" class="navbar-item nav-link">Home <span class="sr-only">(current)</span></a>
            <a tabindex="#" class="nav-item nav-link active">Espace personnel</a>
            <a href="informations.php" class="nav-item nav-link">Informaions</a>
            <a href="telechargements.php" class="nav-item nav-link">Téléchargements</a>

          </div>
        </div>
      </div>

      <div class="container-fluid header-espacperso mt-5">
        <div class="title-espacperso">Votre espace personnel</div>
      </div>

      <div class="container-fluid mb-5 navbar-compte">
        <div class="row justify-content-start">
          <div class="col-7">
            <p class="card-text">Compte 1</p>
          </div>
          <div class="col-5" >
            <p>Capital : [php capital]</p>
          </div>
        </div>
      </div>

      <div class="container mb-4">
        <div class="row">
          <div class="col-md-9">
            <div class="row">
              <div class="col-12">
                <div class="card mb-4 shadow-sm">
                  <div class="card-body">
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-xl-6">
                <div class="card mb-4 shadow-sm">
                  <div class="card-body">
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-xl-6">
                <div class="card mb-4 shadow-sm">
                  <div class="card-body">
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="col">
            <div class="card mb-4 shadow-sm">
              <div class="card-header">
              </div>
              <div class="card-body">
                <div class="card-title">Infos</div>
                [Name Here]
                <br>[Capital Here]
                <br><button class="btn btn-secondary" type="button" name="but1"> first button</button>
              </div>
            </div>
          </div>
        </div>
      </div>






    </div>


    <!-- Script loaded after the page -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

    <!-- <script type="text/javascript" src="js/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="bootstrap-4.2.1-dist/js/bootstrap.min.js"> -->



  </body>
</html>

<!DOCTYPE html>
<html lang="fr" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Test PHP Ping</title>
  </head>
  <body>


    <?php
      $host = "78.201.71.90";
      $port = 12212;
      $data = 'P';

      if ( ($socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === FALSE )
        echo "socket_create() failed: reason: " .             socket_strerror(socket_last_error());
      else
      {
        echo "Attempting to connect to '$host' on port '$port'...<br>";
        if ( ($result = socket_connect($socket, $host, $port)) === FALSE )
            echo "socket_connect() failed. Reason: ($result) " .     socket_strerror(socket_last_error($socket));
        else {
            echo "Sending data...<br>";
            socket_write ($socket, $data."\r\n", strlen ($data."\r\n"));
            echo "OK<br>";

            echo "Reading response:<br>";
            while ($out = socket_read($socket, 2048)) {
              if ($out === 'stop') {
                socket_close($socket);
              }
              else {
                $order   = array("\r\n", "\n", "\r");
                $replace = '<br />';
                $remp = str_replace($order, $replace, $out);

                echo $remp;
              }
            }
        }
        socket_close($socket);
        echo "closed";
      }
    ?>




  </body>
</html>

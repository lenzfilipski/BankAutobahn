# BankAutobahn

Educational project for school (ISN) - Service de banque en ligne

## Présentation
Utiliser un serveur qui met en relation une base de données, un site web et un programme sur un distributeur. Le but de ce projet est de mettre en relation plusieurs languages de programation pour fonctionner ensemble en utilisant le réseau et les bases de données.

### Lien du site
[bank.filipski.fr](http://bank.filipski.fr)

## Protocole de communication
On utilise le protocole websocket pour communiquer entre le client et la base de données (BDD). Comme on ne peut envoyer que des chaines de caractère, on à décidé de les découper en plusieurs parties. Les **quatre premiers caractères correspondent à l'ID de la requette** et ainsi le client ou le serveur éffectuent différentes actions en fonction de la requette (ex : vérifier si l'ID de l'utilisateur et le mot de passe correspondent avec les données de la BDD ou afficher le capital de l'utilisateur au bon endroit). **Le reste de la chaine de caractères correspond au contenu à traiter** (ex : l'ID utilisateur et le mot de passe à comparer ou le capital de l'utilisateur à afficher).

Pour que les communications soient sécurisées il faut utiliser le protocole SSL pour le http et websocket (ws). Pour le https il faut générer un certificat et une clé, faire signer le certificat (par soi ou une autorité) et forcer la redirrection du http au https. Pour le wss on utilise du reverse proxy ; le client envoie une requette au serveur avec une url particulière, le serveur redirige de cette url vers une autre en interne (ws://localhost:5001 dans notre cas) puis renvoye des données au client si besoin.

## Les fichiers commentés ou à regarder :
- [html/test/testping.html](https://github.com/Elyox/BankAutobahn/blob/commentaires/html/test/testping.html)
- [html/test/pingscript.js](https://github.com/Elyox/BankAutobahn/blob/commentaires/html/test/pingscript.js)
- [html/test/index.js](https://github.com/Elyox/BankAutobahn/blob/commentaires/html/test/index.js)
- [Android/MainActivity.java](https://github.com/Elyox/BankAutobahn/blob/commentaires/Android/MainActivity.java)



## Cahier des charges

[à compléter]



## Cartes Euristiques
### Liaison des différents éléments
![alt text](https://github.com/Elyox/BankAutobahn/blob/master/misc/elements.png)

### Les facteurs liés aux comptes
![alt text](https://github.com/Elyox/BankAutobahn/blob/master/misc/compte.png)

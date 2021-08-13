# Projet 7 : Groupomania  
### Installation  
* Cloner ce projet depuis GitHub : https://github.com/Sol7styx/Projet7b_21072021.git  
### Backend  
* Ouvrir le terminal, aller dans le répertoire backend et exécuter `npm install` pour installer les dépendances.  
* Ouvrir le fichier `.env` et entrez les informations nécessaires (pour les besoins de la soutenance, j'ai laissé un fichier .env pré-rempli).
* Exécuter la commande `node bdd_config/bdd_config.js` pour configurer et créer la base de données MySql  
* (Si vous ne voulez pas créer une base de données vierge, vous pouvez aussi utiliser le fichier dump groupomania.sql du dossier backend après avoir créé la base de données groupomania, et vous aurez ainsi immédiatement accès à un utilisateur admin (admin1@mail.com / Passadmin1) et un utilisateur normal (user1@mail.com / Password1)).
* Exécuter la commande `nodemon server` pour lancer le serveur de développement.  
### Frontend
* Ouvrir le terminal, aller dans le répertoire frontend et exécuter `npm install` pour installer les dépendances.  
* Ouvrir le fichier `.env` du front et entrer la même clé secrète renseignée dans le `.env` du backend.  
* Le projet a été généré avec VueJS: exécuter `npm run serve` pour lancer le serveur de développement.

 

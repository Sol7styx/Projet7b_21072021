-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 13 août 2021 à 14:46
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

DROP TABLE IF EXISTS `commentaires`;
CREATE TABLE IF NOT EXISTS `commentaires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `publication_id` int NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT (now()),
  `message` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`,`user_id`,`publication_id`),
  KEY `fk_commentaire_user_id` (`user_id`),
  KEY `fk_commentaire_publication_id` (`publication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `user_id`, `publication_id`, `creation_date`, `message`) VALUES
(2, 4, 6, '2021-08-07 16:35:35', 'Bienvenue'),
(3, 5, 7, '2021-08-13 09:19:01', 'Hello'),
(4, 5, 6, '2021-08-13 09:19:18', 'Bienvenue');

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

DROP TABLE IF EXISTS `publications`;
CREATE TABLE IF NOT EXISTS `publications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT (now()),
  `titre` text COLLATE utf8_bin NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `image_url` text COLLATE utf8_bin,
  PRIMARY KEY (`id`,`user_id`),
  KEY `fk_publication_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id`, `user_id`, `creation_date`, `titre`, `description`, `image_url`) VALUES
(6, 3, '2021-08-07 16:33:28', 'Présentation User2', 'Bonjour, je suis un des responsables informatique du groupe. Au plaisir d\'échanger avec vous.', 'http://localhost:3000/images/responsable-informatique.jpg1628354008835.jpg'),
(7, 4, '2021-08-07 16:35:18', 'Présentation User1', 'Bonjour à tous, je suis l\'un des acheteurs fruits et légumes. A bientôt.', 'http://localhost:3000/images/Legumes.jpg1628354118350.jpg'),
(8, 5, '2021-08-13 09:18:43', 'Community Manager', 'Hello, je veille à ce que tout se passe dans la bonne humeur sur ce forum. N\'hésitez pas, je suis à votre service.', 'http://localhost:3000/images/Community-Manager-953x536.jpg1628846323776.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creation_date` timestamp NOT NULL DEFAULT (now()),
  `nom` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `prenom` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(60) COLLATE utf8_bin NOT NULL,
  `mot_de_passe` varchar(100) COLLATE utf8_bin NOT NULL,
  `niveau_acces` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `creation_date`, `nom`, `prenom`, `email`, `mot_de_passe`, `niveau_acces`) VALUES
(2, '2021-08-07 14:47:39', 'User1', 'test1', 'user1@mail.com', '$2b$10$S/Y5qwQ6efvl6ZlWHzMcH.isx6P6EVBC7FbEFugr7LILwhDIf1dWa', NULL),
(3, '2021-08-07 15:53:04', 'User2', 'test2', 'user2@gmail.com', '$2b$10$FSy1/MqThe03yYcy9rhk4em6ubfmYzuon3qediH1PGLWAD2ROhf56', NULL),
(4, '2021-08-07 16:34:23', 'User1', 'test1', 'user1@gmail.com', '$2b$10$B3nPy8zmxgQPLX96zYYETO67.p6OXxhaGt.2PCFyuxMlXKnSXVx6e', NULL),
(5, '2021-08-13 09:15:03', 'Admin', 'admin', 'admin1@mail.com', '$2b$10$xWcnhydRiWCqyYn.Tf6Ro.pcwLFPwrR4VosSqEzqJk7pNNvaUPTZS', 1),
(6, '2021-08-13 11:06:05', 'Intrus', 'intrus', 'intru@mail.com', '$2b$10$v.WZaAiHC1KngO6lLzCBU.qUCpIguTBQKX0pjwI1HQZBIzKqJErfq', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `votes`
--

DROP TABLE IF EXISTS `votes`;
CREATE TABLE IF NOT EXISTS `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `publication_id` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`publication_id`),
  KEY `fk_vote_user_id` (`user_id`),
  KEY `fk_vote_publication_id` (`publication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `publication_id`, `vote`) VALUES
(2, 4, 6, 2),
(3, 5, 7, 2),
(4, 5, 6, 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_commentaire_publication_id` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_commentaire_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `fk_publication_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `fk_vote_publication_id` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_vote_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

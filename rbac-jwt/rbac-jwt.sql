SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'foo', 'foo@bar.com', '$2a$10$oTTT1GP1JfKkcn9IJHUMjuj.nzPbXFN0GVxpChz.j6WA9AC9hWRWi'),
(2, 'donnygalaxy', 'donny@gamil.com', '$2a$10$kh0gNAEextFDPRr.H6h9pO5h.H2MfdfxFoDCOgBJQrO4Dzk9YWkpS');

INSERT INTO `admins` (`id`, `username`, `email`, `password`) VALUES
(1, 'johnwidth', 'john@width.com', '$2a$10$IMW46rl.uBBLCuudOJFgdOsJFxNDsRGBCmvA1USPQsklkMf2ayFQO'),
(2, 'tylerswitch', 'tyler@switch.com', '$2a$10$ZVqBV1RH8mFnD93SQyXduOncr33Rl087GwzCrXd6mgtZwD1J0DrI.'),
(3, 'carljohnson', 'carl@johnson.com', '$2a$10$o6gW69FCIVvPC/yzbnTUaOfv7vHS.ZKAwDtfNHz2jcJlR4HKLgtgS');

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

COMMIT;
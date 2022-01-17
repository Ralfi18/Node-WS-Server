-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 17, 2022 at 05:10 PM
-- Server version: 8.0.27-0ubuntu0.20.04.1
-- PHP Version: 7.1.33-44+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `react-sockets`
--
CREATE DATABASE IF NOT EXISTS `react-sockets` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `react-sockets`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `token` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token`, `first_name`, `last_name`, `email`, `password`, `last_login`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI0MzU1MTgsImRhdGEiOiJmb29iYXIiLCJpYXQiOjE2NDI0MzE5MTh9.Rn_wpOFh8AKXGU_Yrm3tqEMbcXNSC2KPbeWaEW8Qzf0', 'Rali', 'Dimitrov', 'r.dimitrov.work@gmail.com', '$2b$10$tcJlQG1e55B5TJbvxz0KIuGqndYKPLZB39r.ehSF5vV4k2iYmkYbm', NULL, '2022-01-17 15:57:57', '2022-01-17 15:57:57', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

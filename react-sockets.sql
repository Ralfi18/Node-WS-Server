-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 26, 2022 at 04:31 PM
-- Server version: 8.0.27-0ubuntu0.20.04.1
-- PHP Version: 7.2.34-28+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react-sockets`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'men\'s clothing'),
(2, 'jewelery'),
(3, 'electronics'),
(4, 'women\'s clothing');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int NOT NULL,
  `category_id` int NOT NULL,
  `code` varchar(125) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `category_id`, `code`, `name`, `price`) VALUES
(1, 1, '164318579661f10684c34342.77069509', 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.9),
(2, 1, '164318579661f10684f11dc8.71873335', 'Mens Casual Premium Slim Fit T-Shirts ', 22.3),
(3, 1, '164318579761f106854ee396.28232460', 'Mens Cotton Jacket', 56),
(4, 1, '164318579761f106859d04f5.58399712', 'Mens Casual Slim Fit', 15.98),
(5, 2, '164318579861f106869ee4c5.15822596', 'John Hardy Women\\\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 695),
(6, 2, '164318579861f10686f03397.24968909', 'Solid Gold Petite Micropave ', 168),
(7, 2, '164318579961f1068749db46.16577496', 'White Gold Plated Princess', 9.99),
(8, 2, '164318579961f106877bfe69.39223833', 'Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99),
(9, 3, '164318579961f10687c6ed81.32090980', 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ', 64),
(10, 3, '164318580061f106880b7c03.53008684', 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109),
(11, 3, '164318580061f10688414430.43845478', 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5', 109),
(12, 3, '164318580061f1068875cff4.37566407', 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', 114),
(13, 3, '164318580061f10688adcf49.74387271', 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', 599),
(14, 3, '164318580061f10688dd2528.64846370', 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ', 999.99),
(15, 4, '164318580161f1068920bc83.04192610', 'BIYLACLESEN Women\\\'s 3-in-1 Snowboard Jacket Winter Coats', 56.99),
(16, 4, '164318580161f106895298a0.68991014', 'Lock and Love Women\\\'s Removable Hooded Faux Leather Moto Biker Jacket', 29.95),
(17, 4, '164318580161f10689751fc7.84528245', 'Rain Jacket Women Windbreaker Striped Climbing Raincoats', 39.99),
(18, 4, '164318580161f106899d0204.79893925', 'MBJ Women\\\'s Solid Short Sleeve Boat Neck V ', 9.85),
(19, 4, '164318580161f10689b5c1a3.64472587', 'Opna Women\\\'s Short Sleeve Moisture', 7.95),
(20, 4, '164318580161f10689dabc92.27702638', 'DANVOUY Womens T Shirt Casual Cotton Short', 12.99);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_images`
--

CREATE TABLE `inventory_images` (
  `id` int NOT NULL,
  `inv_id` int NOT NULL,
  `img_url` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `inventory_images`
--

INSERT INTO `inventory_images` (`id`, `inv_id`, `img_url`, `status`) VALUES
(1, 1, 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', 1),
(2, 2, 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', 1),
(3, 3, 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', 1),
(4, 4, 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', 1),
(5, 5, 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', 1),
(6, 6, 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', 1),
(7, 7, 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', 1),
(8, 8, 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', 1),
(9, 9, 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', 1),
(10, 10, 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', 1),
(11, 11, 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg', 1),
(12, 12, 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg', 1),
(13, 13, 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', 1),
(14, 14, 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg', 1),
(15, 15, 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg', 1),
(16, 16, 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg', 1),
(17, 17, 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', 1),
(18, 18, 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg', 1),
(19, 19, 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg', 1),
(20, 20, 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg', 1);

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
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI3NzgyMzYsImRhdGEiOnsidXNlcklkIjoxLCJ1c2VyRW1haWwiOiJyLmRpbWl0cm92LndvcmtAZ21haWwuY29tIiwibmFtZSI6IlJhbGkgRGltaXRyb3YifSwiaWF0IjoxNjQyNzc4MTc2fQ.yWdqq2RsJTIu-KjY9QeVI8pw2YusXcKAbABIETripNg', 'Rali', 'Dimitrov', 'r.dimitrov.work@gmail.com', '$2b$10$tcJlQG1e55B5TJbvxz0KIuGqndYKPLZB39r.ehSF5vV4k2iYmkYbm', NULL, '2022-01-17 15:57:57', '2022-01-17 15:57:57', NULL),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDMyMDc3NjQsImRhdGEiOnsidXNlcklkIjoyLCJ1c2VyRW1haWwiOiJyQG1haWwuY29tIiwibmFtZSI6IlJhbGkgRGltaXRyb3YifSwiaWF0IjoxNjQzMjA2ODY0fQ.cmOvsc9gkGFiuOu94s67ftHL2tJfybSHvRA5dQTc4uE', 'Rali', 'Dimitrov', 'r@mail.com', '$2b$10$tcJlQG1e55B5TJbvxz0KIuGqndYKPLZB39r.ehSF5vV4k2iYmkYbm', NULL, '2022-01-17 15:57:57', '2022-01-17 15:57:57', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_images`
--
ALTER TABLE `inventory_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `inventory_images`
--
ALTER TABLE `inventory_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

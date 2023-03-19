-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 19, 2023 at 03:55 AM
-- Server version: 10.10.3-MariaDB
-- PHP Version: 8.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chess_ai`
--

-- --------------------------------------------------------

--
-- Table structure for table `ai_vs_ai`
--

CREATE TABLE `ai_vs_ai` (
  `id` int(11) NOT NULL,
  `ai_1` int(11) NOT NULL,
  `ai_2` int(11) NOT NULL,
  `evaluate_king_1` int(11) DEFAULT NULL,
  `evaluate_king_2` int(11) DEFAULT NULL,
  `evaluate_material_1` int(11) DEFAULT NULL,
  `evaluate_material_2` int(11) DEFAULT NULL,
  `evaluate_mobility_1` int(11) DEFAULT NULL,
  `evaluate_mobility_2` int(11) DEFAULT NULL,
  `code_room` varchar(20) NOT NULL,
  `move` varchar(12) NOT NULL,
  `board` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_ai`
--

CREATE TABLE `model_ai` (
  `id` int(11) NOT NULL,
  `model_name` text NOT NULL,
  `parameter` text NOT NULL,
  `win` int(11) NOT NULL,
  `lose` int(11) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ai_vs_ai`
--
ALTER TABLE `ai_vs_ai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_ai`
--
ALTER TABLE `model_ai`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ai_vs_ai`
--
ALTER TABLE `ai_vs_ai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_ai`
--
ALTER TABLE `model_ai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

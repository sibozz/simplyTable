-- phpMyAdmin SQL Dump
-- version 3.3.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 12, 2012 at 11:54 AM
-- Server version: 5.5.20
-- PHP Version: 5.3.10-1ubuntu2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `simplyData`
--

-- --------------------------------------------------------

--
-- Table structure for table `grid`
--

CREATE TABLE IF NOT EXISTS `grid` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `grid`
--

INSERT INTO `grid` (`id`, `nama`, `email`, `alamat`) VALUES
(1, 'amir', 'amir@mail.com', 'jakarta'),
(2, 'budi', 'budi@mail.com', 'bekasi'),
(3, 'cecep', 'cecep@mail.com', 'bandung'),
(4, 'dodo', 'dodo@mail.com', 'surabaya'),
(5, 'eric', 'eric@mail.com', 'amrik'),
(6, 'fery', 'fery@mail.com', 'jogja'),
(7, 'gery', 'gery@mail.com', 'papua'),
(8, 'hery', 'hery@mail.com', 'tangerang'),
(9, 'ilham', 'ilham@mail.com', 'irian jaya'),
(10, 'jarwo', 'jarwo@mail.com', 'betawi'),
(11, 'kasih', 'kasih@mail.com', 'jogja'),
(12, 'lukman', 'lukman@mail.com', 'lamongan');

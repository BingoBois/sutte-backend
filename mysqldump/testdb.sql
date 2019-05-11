/*
Navicat MySQL Data Transfer

Source Server         : les
Source Server Version : 50726
Source Host           : 35.198.188.139:3306
Source Database       : staging

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2019-05-12 00:15:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_index` (`email`),
  UNIQUE KEY `id_index` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', 'kongen@bingo.dk', '75165bf1070522fa6e7c3ea79090809118448e8a96775f28c5612384d82214d9', 'admin', 'Mester Mestersen');
INSERT INTO `account` VALUES ('2', 'soren@fattig.dk', '75165bf1070522fa6e7c3ea79090809118448e8a96775f28c5612384d82214d9', 'teacher', 'Soldirch S Uttesen');
INSERT INTO `account` VALUES ('3', 'stud1@cph.dk', '75165bf1070522fa6e7c3ea79090809118448e8a96775f28c5612384d82214d9', 'student', 'Dukkedreng Dank');
INSERT INTO `account` VALUES ('4', 'stud2@cph.dk', '75165bf1070522fa6e7c3ea79090809118448e8a96775f28c5612384d82214d9', 'student', 'Kasper Kaspersen');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(255) NOT NULL,
  `fk_suggestedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_index` (`name`) USING BTREE,
  UNIQUE KEY `id_index` (`id`) USING BTREE,
  KEY `fk_suggestedBy` (`fk_suggestedBy`),
  CONSTRAINT `fk_suggestedBy` FOREIGN KEY (`fk_suggestedBy`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', 'madlavning-1', 'u make da food', '1', null);
INSERT INTO `course` VALUES ('2', 'madlavning-2', 'lav en cola', '1', null);
INSERT INTO `course` VALUES ('3', 'design-by-contract-1', 'aldrig igen', '0', '2');
INSERT INTO `course` VALUES ('4', 'algo-course-1', 'We are screwed', '1', null);
INSERT INTO `course` VALUES ('5', 'test-course-1', 'We are Testing Test', '1', null);
INSERT INTO `course` VALUES ('7', 'database-1', 'We are basing our data', '1', null);

-- ----------------------------
-- Table structure for signup
-- ----------------------------
DROP TABLE IF EXISTS `signup`;
CREATE TABLE `signup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_account` int(11) NOT NULL,
  `fk_course` int(11) NOT NULL,
  `paid` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_account_index` (`fk_account`),
  KEY `fk_course_index` (`fk_course`),
  CONSTRAINT `fk_account` FOREIGN KEY (`fk_account`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_course` FOREIGN KEY (`fk_course`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of signup
-- ----------------------------
INSERT INTO `signup` VALUES ('1', '3', '1', '1');
INSERT INTO `signup` VALUES ('2', '4', '4', '0');
INSERT INTO `signup` VALUES ('3', '3', '4', '1');

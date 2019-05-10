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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', 'kongen@bingo.dk', '75165bf1070522fa6e7c3ea79090809118448e8a96775f28c5612384d82214d9', 'admin', 'Mester Mestersen');
INSERT INTO `account` VALUES ('2', 'soren@fattig.dk', '75165bf1070522fa6e7c3ea79090809118448e8a96775f28c5612384d82214d9', 'teacher', 'Soldirch S Uttesen');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(255) NOT NULL,
  `fk_suggstedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_index` (`name`) USING BTREE,
  UNIQUE KEY `id_index` (`id`) USING BTREE,
  KEY `fk_suggestedBy` (`fk_suggstedBy`),
  CONSTRAINT `fk_suggestedBy` FOREIGN KEY (`fk_suggstedBy`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', 'madlavning-1', 'u make da food', '1', null);
INSERT INTO `course` VALUES ('2', 'madlavning-2', 'lav en cola', '1', null);
INSERT INTO `course` VALUES ('3', 'design-by-contract-1', 'aldrig igen', '0', '2');

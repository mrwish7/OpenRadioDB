CREATE TABLE `sites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itu` varchar(3) NOT NULL,
  `region` varchar(3) NOT NULL,
  `city` text NOT NULL,
  `detailed_name` text DEFAULT NULL,
  `lat` decimal(7,4) NOT NULL,
  `lon` decimal(7,4) NOT NULL,
  `accurate` tinyint(1) DEFAULT 1,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `fm_tx` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL,
  `freq` decimal(4,1) NOT NULL DEFAULT '87.5',
  `ant_height` int DEFAULT '0',
  `ant_pol` char(1) DEFAULT NULL,
  `erp` int DEFAULT '0',
  `erp_h` int DEFAULT '0',
  `erp_v` int DEFAULT '0',
  `ant_pattern` json DEFAULT NULL,
  `callsign` text DEFAULT NULL,
  `station_id` int NOT NULL,
  `pi` char(4) DEFAULT NULL,
  `pi_reg` char(4) DEFAULT NULL,
  `ps` json DEFAULT NULL,
  `ps_reg` json DEFAULT NULL,
  `external_id` text DEFAULT NULL,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `stations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `reg_prog` text DEFAULT NULL,
  `website` text DEFAULT NULL,
  `streams` json DEFAULT NULL,
  `logopath` text DEFAULT NULL,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE items (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL UNIQUE,
    urlname VARCHAR(45) NOT NULL UNIQUE
    price FLOAT(5,1) NOT NULL
);

CREATE TABLE relics (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type ENUM('Lith', 'Meso', 'Neo', 'Axi') NOT NULL,
    name VARCHAR(3) NOT NULL,
    CONSTRAINT unique_relics UNIQUE INDEX (type, name)
);

CREATE TABLE drops (
    relic_id INT UNSIGNED,
    item_id INT UNSIGNED, 
    rarity ENUM('Common', 'Uncommon', 'Rare') NOT NULL,
    CONSTRAINT unique_row PRIMARY KEY (relic_id, item_id),
    FOREIGN KEY (relic_id)
        REFERENCES relics(id)
        ON DELETE CASCADE,
    FOREIGN KEY (item_id)
        REFERENCES items(id)
        ON DELETE CASCADE
);

-- create table sets (
--     id MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
--     setname VARCHAR(25) NOT NULL, 
--     urlname VARCHAR(30) NOT NULL, 
--     item_1 MEDIUMINT UNSIGNED,
--     amnt_1 TINYINT UNSIGNED,
--     item_2 MEDIUMINT UNSIGNED,
--     amnt_2 TINYINT UNSIGNED,
--     item_3 MEDIUMINT UNSIGNED,
--     amnt_3 TINYINT UNSIGNED,
--     item_4 MEDIUMINT UNSIGNED,
--     amnt_4 TINYINT UNSIGNED,
--     item_5 MEDIUMINT UNSIGNED,
--     amnt_5 TINYINT UNSIGNED,
--     CONSTRAINT `item 1` FOREIGN KEY (item_1) REFERENCES items(id),
--     CONSTRAINT `item 2` FOREIGN KEY (item_2) REFERENCES items(id),
--     CONSTRAINT `item_3` FOREIGN KEY (item_3) REFERENCES items(id),
--     CONSTRAINT `item_4` FOREIGN KEY (item_4) REFERENCES items(id),
--     CONSTRAINT `item_5` FOREIGN KEY (item_5) REFERENCES items(id)
-- );



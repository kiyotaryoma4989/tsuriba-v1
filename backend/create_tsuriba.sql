CREATE TABLE t_tsuriba (
	id INT PRIMARY KEY AUTO_INCREMENT,
    pref_code TEXT NOT NULL,
    city_id INT UNIQUE NOT NULL,
    place_detail TEXT NOT NULL,
    detail TEXT NOT NULL
);

-- データの挿入t_tsuriba
INSERT INTO t_tsuriba (pref_code, city_id, place_detail, detail) VALUES
(1, 1, '011002', 1),
(2, 2, '011011', 1),
(3, 3, '011029', 1),
(4, 4, '011037', 1),
(5, 5, '011037', 1)
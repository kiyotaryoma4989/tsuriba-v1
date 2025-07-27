CREATE TABLE t_tsuriba (
	id INT PRIMARY KEY AUTO_INCREMENT,
    pref_code TEXT NOT NULL,
    city_id INT UNIQUE NOT NULL,
    place_detail TEXT NOT NULL,
    detail TEXT NOT NULL
);

-- データの挿入t_tsuriba
INSERT INTO t_tsuriba (pref_code, city_id, place_detail, detail) VALUES
(1, 1, 'これは場所の詳細です。', 'これはサンプル１です。'),
(2, 2, 'これは場所の詳細です。', 'これはサンプル２です。'),
(3, 3, 'これは場所の詳細です。', 'これはサンプル３です。'),
(4, 4, 'これは場所の詳細です。', 'これはサンプル４です。'),
(5, 5, 'これは場所の詳細です。', 'これはサンプル５です。')
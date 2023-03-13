CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    -- or VARCHAR(200) to add limit
    image_url TEXT
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);


INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://saltandbaker.com/wp-content/uploads/2022/05/HP-birthday-cake-square.jpg');
INSERT INTO dishes (title, image_url) VALUES ('pudding', 'https://saltandbaker.com/wp-content/uploads/2022/05/HP-birthday-cake-square.jpg');

INSERT INTO dishes (title, image_url) VALUES ('cake', 'https://m.media-amazon.com/images/I/8106LD1R01L._SL1500_.jpg');




INSERT INTO users (email) VALUES ('dt@ga.co');
INSERT INTO users (email) VALUES ('dt@generalassemb.ly');

ALTER TABLE dishes ADD COLUMN user_id INTEGER;
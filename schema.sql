DROP TABLE IF EXISTS locationData;

CREATE TABLE locationData
(
    id SERIAL PRIMARY KEY,
    search_query varchar(200),
    formatted_query varchar(200),
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7)
);


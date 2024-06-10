CREATE TABLE the_user(
    id serial not null primary key,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    password varchar NOT NULL
);

CREATE TABLE device_data (
    id SERIAL PRIMARY KEY,
    device VARCHAR(255),
    time TIMESTAMP,
    snr FLOAT,
    station VARCHAR(255),
    data VARCHAR(255),
    avg_snr FLOAT,
    lat FLOAT,
    lng FLOAT,
    rssi FLOAT,
    seq_number INTEGER
);

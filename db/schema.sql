DROP DATABASE IF EXISTS jukebox;

CREATE DATABASE jukebox;

\c jukebox;

DROP TABLE IF EXISTS playlist_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;

CREATE TABLE playlists(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE tracks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration_ms INTEGER NOT NULL
);

CREATE TABLE playlist_tracks(
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER REFERENCES playlists(id) NOT NULL,
    track_id INTEGER REFERENCES tracks(id) NOT NULL,
    UNIQUE (playlist_id, track_id)
);
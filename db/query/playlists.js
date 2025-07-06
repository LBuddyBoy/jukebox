import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
    INSERT INTO playlists(name, description)
    VALUES($1, $2)
    RETURNING *
    `;

  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);

  return playlist;
}

export async function getPlaylists() {
  const sql = `
    SELECT * FROM playlists
    `;

  const { rows } = await db.query(sql);

  return rows;
}

export async function getPlaylistTracks(playlist_id) {
  const sql = `
    SELECT * FROM playlist_tracks
    WHERE playlist_id = $1
    `;

  const { rows } = await db.query(sql, [playlist_id]);

  return rows;
}

export async function getPlaylistById(id) {
  const sql = `
    SELECT * FROM playlists
    WHERE id = $1
    `;

  const {
    rows: [playlist],
  } = await db.query(sql, [id]);

  return playlist;
}

export async function addTrack(playlist_id, track_id) {
  try {
    const sql = `
    INSERT INTO playlist_tracks(playlist_id, track_id)
    VALUES($1, $2)
    RETURNING *
    `;

    const {
      rows: [track],
    } = await db.query(sql, [playlist_id, track_id]);

    return track;
  } catch (error) {
    if (error.code == 23505) {
      throw new Error("That playlist already has that track.");
    }

    console.log(error);
  }
}

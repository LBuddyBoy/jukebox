import db from "#db/client";

export async function createPlaylistTrack(playlist_id, track_id) {
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

export async function getPlaylistTracks(playlist_id) {
  const sql = `
    SELECT playlist_tracks.*, json_agg(playlists) AS playlist, json_agg(tracks) AS track
    FROM playlist_tracks
    JOIN playlists ON playlists.id = playlist_tracks.playlist_id
    JOIN tracks ON tracks.id = playlist_tracks.track_id
    WHERE playlist_id = $1
    GROUP BY playlist_tracks.id
    `;

  const { rows } = await db.query(sql, [playlist_id]);

  return rows;
}

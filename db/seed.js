import db from "#db/client";
import { addTrack, createPlaylist, getPlaylists } from "./query/playlists.js";
import { createTrack, getTracks } from "./query/tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let index = 0; index < 10; index++) {
    await createPlaylist(
      "Playlist-" + (index + 1),
      "A playlist to represent playlist #" + (index + 1)
    );
  }
  for (let index = 0; index < 20; index++) {
    await createTrack("Track-" + (index + 1), getRandomInt(1000, 50000));
  }

  const playlists = await getPlaylists();
  const tracks = await getTracks();

  for (let index = 0; index < 15; index++) {
    const randomPlaylistIndex = getRandomInt(0, playlists.length - 1);

    await addTrack(
      playlists[randomPlaylistIndex].id,
      tracks[index].id
    );
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

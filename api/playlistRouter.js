import {
  addTrack,
  createPlaylist,
  getPlaylistById,
  getPlaylists,
  getPlaylistTracks,
} from "#db/query/playlists";
import express from "express";
import { isValidId } from "./utils";
import { getTrackById } from "#db/query/tracks";
const playlistRouter = express.Router();

playlistRouter.get("/", async (req, res) => {
  res.status(200).json(await getPlaylists());
});

playlistRouter.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided");
  }

  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json("Please provide a name and description in the body.");
  }

  const playlist = await createPlaylist(name, description);

  res.status(201).json(playlist);
});

playlistRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The playlist id must be a positive integer.");
  }

  const playlist = await getPlaylistById(id);

  if (!playlist) {
    return res.status(404).json("A playlist with that id does not exist.");
  }

  res.status(200).json(playlist);
});

playlistRouter.get("/:id/tracks", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The playlist id must be a positive integer.");
  }

  const playlist = await getPlaylistById(id);

  if (!playlist) {
    return res.status(404).json("A playlist with that id does not exist.");
  }

  res.status(200).json(await getPlaylistTracks(playlist.id));
});

playlistRouter.post("/:id/tracks", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided");
  }

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The playlist id must be a positive integer.");
  }

  const { trackId } = req.body;

  if (!isValidId(trackId)) {
    return res.status(400).json("The track id must be a positive integer.");
  }

  const playlist = await getPlaylistById(id);

  if (!playlist) {
    return res.status(404).json("A playlist with that id does not exist.");
  }

  try {
    if (!await getTrackById(trackId)) {
        return res.status(400).json("A track with that id does not exist.");
    }
    const track = await addTrack(id, trackId);

    res.status(201).json(track);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default playlistRouter;

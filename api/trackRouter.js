import { getTrackById, getTracks } from "#db/query/tracks";
import express from "express";
import { isValidId } from "./utils.js";
const trackRouter = express.Router();

trackRouter.get("/", async (req, res) => {
  res.status(200).json(await getTracks());
});

trackRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The id must be a positive integer.");
  }

  const track = await getTrackById(id);

  if (!track) {
    return res.status(404).json("A track with that id does not exist.");
  }

  res.status(200).json(track);
});

export default trackRouter;

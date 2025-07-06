import playlistRouter from "#api/playlistRouter";
import trackRouter from "#api/trackRouter";
import express from "express";
const app = express();

app.use(express.json());

app.use("/playlists", playlistRouter);
app.use("/tracks", trackRouter);

export default app;

import express from "express";
import {
  createTrack,
  deleteTrack,
  findTrackById,
  findTrackBySlug,
  findTracks,
  updateTrack,
} from "../controller/TrackController";

const trackRouter = express.Router();

trackRouter.post("/tracks", createTrack);
trackRouter.get("/tracks", findTracks);
trackRouter.get("/tracks/:id", findTrackById);
trackRouter.get("/tracks/slug/:id", findTrackBySlug);
trackRouter.put("/tracks/:id", updateTrack);
trackRouter.delete("/tracks/:id", deleteTrack);

export default trackRouter;

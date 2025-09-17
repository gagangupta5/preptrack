import express from "express";
import {
  createTrack,
  deleteTrack,
  findTrackById,
  findTrackBySlug,
  findTracks,
  updateTrack,
} from "../controller/TrackController";
import { verifyToken } from "../middleware/AuthMiddleware";

const trackRouter = express.Router();

trackRouter.post("/tracks", createTrack);
trackRouter.get("/tracks", verifyToken, findTracks);
trackRouter.get("/tracks/:id", findTrackById);
trackRouter.get("/tracks/slug/:id", findTrackBySlug);
trackRouter.put("/tracks/:id", updateTrack);
trackRouter.delete("/tracks/:id", deleteTrack);

export default trackRouter;

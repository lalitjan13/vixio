import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../utils/asyncMiddleware.js";

const getVideoComments = asyncMiddleware(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncMiddleware(async (req, res) => {
  // TODO: add a comment to a video
});

const updateComment = asyncMiddleware(async (req, res) => {
  // TODO: update a comment
});

const deleteComment = asyncMiddleware(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };

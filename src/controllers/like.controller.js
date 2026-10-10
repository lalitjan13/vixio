import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../utils/asyncMiddleware.js";

const toggleVideoLike = asyncMiddleware(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(409, "Invalid video Id");
  }

  const isVideoExist = await Video.findById(videoId);

  if (!isVideoExist) {
    throw new ApiError(404, "Video not found");
  }

  const deleted = await Like.findOneAndDelete({
    video: videoId,
    likedBy: userId,
  });

  if (deleted) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isLiked: false }, "Video unliked successfully")
      );
  }

  await Like.create({ video: videoId, likedBy: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Video liked successfully"));
});

const toggleCommentLike = asyncMiddleware(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }
  const isCommentExist = await Comment.findById(commentId);

  if (!isCommentExist) {
    throw new ApiError(404, "Comment not found");
  }

  const deleted = await Like.findOneAndDelete({
    comment: commentId,
    likedBy: userId,
  });

  if (deleted) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isLiked: false }, "Comment unliked successfully")
      );
  }

  await Like.create({ comment: commentId, likedBy: userId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { isLiked: true }, "Comment liked successfully")
    );
});

const toggleTweetLike = asyncMiddleware(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }

  const isTweetExist = await Tweet.findById(tweetId);

  if (!isTweetExist) {
    throw new ApiError(404, "Tweet not found");
  }

  const deleted = await Like.findOneAndDelete({
    tweet: tweetId,
    likedBy: userId,
  });

  if (deleted) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isLiked: false }, "Tweet unliked successfully")
      );
  }

  await Like.create({ tweet: tweetId, likedBy: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Tweet liked successfully"));
});

const getLikedVideos = asyncMiddleware(async (req, res) => {
  const userId = req.user._id;

  const likedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(userId),
        video: { $exists: true },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $addFields: {
        video: {
          $first: "$video",
        },
      },
    },
    // {
    //   $project:{

    //   }
    // }
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };

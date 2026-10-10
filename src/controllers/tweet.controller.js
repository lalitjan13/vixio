import { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../utils/asyncMiddleware.js";

const createTweet = asyncMiddleware(async (req, res) => {
  const { content } = req.body;
  const { _id } = req.user;

  if (!content) {
    throw new ApiError(400, "content is required");
  }

  const isTweetExist = await Tweet.findOne({ content, owner: _id });

  if (isTweetExist) {
    throw new ApiError(409, "You already have a tweet with same content");
  }

  const tweet = new Tweet({ content, owner: _id });
  await tweet.save();

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncMiddleware(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(409, "Invalid User Id");
  }

  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new ApiError(409, "User not found");
  }

  const tweets = await Tweet.find({ owner: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Tweet fetched Successfully"));
});

const updateTweet = asyncMiddleware(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(409, "Invalid tweet Id");
  }

  const tweet = await Tweet.findOne({ _id: tweetId });

  if (!tweet) {
    throw new ApiError(409, "Tweet not found");
  }

  if (!tweet.owner.equals(req.user._id)) {
    throw new ApiError(403, "You are not allowed to do this action");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { content },
    { returnDocument: "after" }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated Successfully"));
});

const deleteTweet = asyncMiddleware(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(409, "Invalid tweet Id");
  }

  const tweet = await Tweet.findOne({ _id: tweetId });

  if (!tweet) {
    throw new ApiError(409, "Tweet not found");
  }

  if (!tweet.owner.equals(req.user._id)) {
    throw new ApiError(403, "You are not allowed to do this action");
  }

  await Tweet.findByIdAndDelete(tweetId);

  return (
    res.status(200),
    json(new ApiResponse(200, { success: true }, "Tweet Deleted Successfully"))
  );
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };

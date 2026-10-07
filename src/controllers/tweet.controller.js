import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../utils/asyncMiddleware.js";

const createTweet = asyncMiddleware(async (req, res) => {
  //TODO: create tweet
});

const getUserTweets = asyncMiddleware(async (req, res) => {
  // TODO: get user tweets
});

const updateTweet = asyncMiddleware(async (req, res) => {
  //TODO: update tweet
});

const deleteTweet = asyncMiddleware(async (req, res) => {
  //TODO: delete tweet
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };

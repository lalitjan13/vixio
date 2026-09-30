import { asyncMiddleware } from "../utils/asyncMiddleware.js";

const registerUser = asyncMiddleware(async (req, res) => {
  res.status(200).json({ message: "ok" });
});

export { registerUser };

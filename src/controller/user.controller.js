import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/User";

const registerUser = asyncHandler(async(req, res) => {
  const users = await User.find();
  return res.status(200).json(new ApiResponse(200, "All users", users));
});

export { registerUser };
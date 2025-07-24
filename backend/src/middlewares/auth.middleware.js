import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";


export const verifyJWT=asyncHandler(async (req, res, next) => {
    try {
        const token = 
          req.cookies?.accessToken || 
          (req.header("Authorization")?.startsWith("Bearer ") 
            ? req.header("Authorization").replace("Bearer ", "") 
            : null);
      
  if(!token){
  throw new ApiError(401,"Unauthorized request" );
  }
  const decodedToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const user=  await User.findById(decodedToken?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Unauthorized request" );
    }
    req.user=user;
    next();
    }catch(error){
        throw new ApiError(401,error?.message ||"Invalid access token" );
    }

    
})

export const authorizeRoles = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Access forbidden: insufficient permissions");
    }
    next();
  });
};

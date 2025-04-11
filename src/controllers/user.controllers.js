import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req , res) => {
    // get user details from frontend
    // validation : user ne empty username toh nhi beja ya empty email toh nhi beja
    // check if user already exists : username , email
    // check for images , check for avatar
    // upload them to cloudinary , check for avatar
    // create user object - create entry in db
    // remove password and refresh token field from response 
    // check for user creation
    // return res

    // get user details from frontend
    const {fullName , email , username , password} = req.body
    console.log("email:" , email);

    if  ([fullName , email , username , password].some((field) => 
        field?.trim() === "") 
        )
        {
            throw new ApiError(400 , "Please fill all fields");
        }

        User.findOne({
            $or: [{username} , {email}]
        })

        if (existedUser) {
            throw new ApiError(400 , "Username or Email already exists");
        }

        const avatarLocalPath = req.file?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;



        if(!avatarLocalPath) {
            throw new ApiError(400 , "Please upload an avatar");
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar) {
            throw new ApiError(400 , "Please upload an avatar");
        }

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage.url || "",
            email,
            password,
            username: username.toLowerCase()
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser) {
            throw new ApiError(404 , "User not found");
        }

        return res.status(201).json(
            new ApiResponse(200,createdUser,'User Registered Successfully')
        )

    })

export {
    registerUser,
}

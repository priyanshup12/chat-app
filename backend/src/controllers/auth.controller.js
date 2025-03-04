import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  //get user info from signup form
  const { fullName, email, password } = req.body;
  try {
    //check if all data is recieved
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Fill all details." });
    //check validity of email
    if (!/\S+@\S+\.\S+/.test(email))
      return res.status(400).json({ message: "Invalid email address" });
    //check if password is of required length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters" });
    }
    //check if the email is already in use
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    //create hash and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPass,
    });
    // if user data is inserted in db successfully then create a jwt
    if (newUser) {
      genToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Fill all details." });
    const user = await User.findOne({ email });
    //if user not found
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    //check if password is correct
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //if credentials are correct then send the jwt token
    genToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in Login controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const base64Length = profilePic.length - (profilePic.indexOf(",") + 1);
    const padding = (profilePic.charAt(profilePic.length - 2) === "=") ? 2 : ((profilePic.charAt(profilePic.length - 1) === "=") ? 1 : 0);
    const fileSizeInBytes = (base64Length * 0.75) - padding;

    if (fileSizeInBytes > 5 * 1024 * 1024) { 
      return res.status(413).json({ message: "Image size is too large" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in check controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

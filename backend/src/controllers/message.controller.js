import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketID } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const fetchUsersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } });
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in fetching Users");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, recieverId: userToChatId },
        {
          senderId: userToChatId,
          recieverId: senderId,
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in fetching messages");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    //realtime functionality goes here:

    const receiverSocketID = getReceiverSocketID(recieverId);
    if(receiverSocketID){
      io.to(receiverSocketID).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage messages");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

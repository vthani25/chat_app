import User from "../models/User.js";
import Message from "../models/Messages.js"
import cloudinary from "../lib/cloudinary.js";
import {io, userSocketMap} from "../server.js";


//Get all messages sent and received previously
export const getMessages = async(req,res) => {
    try{
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverId:myId}, {seen:true})

        res.json({success:true, messages})
    }
    catch(error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}


//Get All Users for Sidebar(so everyone but me + number of unseen messages)
export const getUsersForSidebar = async()=>{
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        //Count number of messages not seen for users sidebar
        const unseenMessagess = {}
        const promises = filteredUsers.map(async (user)=>{
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen:false}) // sender id from the filtered users list, we are the receiver id
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true, users: filteredUsers, unseenMessages})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

//Mark messages as seen
export const markMessageAsSeen = async(req, res)=>{
    try{
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen: true})
        res.json({success: true})

    } catch(error){
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

//Send messages to selected user
export const sendMessage = async(req, res) =>{
    try{
        const {text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        //send image to cloudinary and store the generated url
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        
        //put info into the schema
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        //Emit new message to receiver's socket(make it visible in real time)
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",  newMessage)
        }
        
        res.json({success: true, newMessage});
    }
    catch(error){
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}
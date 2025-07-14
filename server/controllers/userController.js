import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Sign Up A New User
export const SignUp = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body || {};

    if (!fullName || !email || !password || !bio) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Account already exists" });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT || "10", 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      bio
    });

    const token = generateToken(newUser._id); 
    const user = newUser.toObject();
    delete user.password;

    res.status(201).json({ success: true, user, token, message: "Account created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ success: true, user: safeUser, token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Check if user is authenticated
export const checkAuth = (req, res) =>{
    res.json({success:true, user:req.user})
}

//Update user profile details
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body || {};
    const update = {};
    if (bio) update.bio = bio;
    if (fullName) update.fullName = fullName;

    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic, { folder: "avatars" });
      update.profilePic = upload.secure_url;
    }

    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true })
                           .select("-password");
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
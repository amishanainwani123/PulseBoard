import type { Request, Response } from "express";
import Club from "../models/Club.model.ts";
import User from "../models/User.model.ts";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createClub = async (req: Request, res: Response) => {
  try {
    const { clubId, name, description, category } = req.body;

    if (!clubId || !name || !description || !category) {
      return res.status(400).json({ message: "Please provide clubId, name, description, and category" });
    }

    const existingClub = await Club.findOne({ $or: [{ name }, { clubId }] });
    if (existingClub) {
      return res.status(400).json({ message: "Club or ID already exists" });
    }

    const newClub = new Club({ clubId, name, description, category });
    const savedClub = await newClub.save();

    res.status(201).json({ message: "Club created successfully", club: savedClub });
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleFollowClub = async (req: AuthenticatedRequest, res: Response) => {
  const { clubId } = req.params; 
  const userId = req.user?.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const numericId = Number(clubId);

    const followingList = (user.following as number[]) || [];
    const isFollowing = followingList.includes(numericId);

    if (isFollowing) {
      await User.findByIdAndUpdate(userId, { $pull: { following: numericId } });
      await Club.findOneAndUpdate({ clubId: numericId }, { $inc: { followers: -1 } });
    } else {
      await User.findByIdAndUpdate(userId, { $addToSet: { following: numericId } });
      await Club.findOneAndUpdate({ clubId: numericId }, { $inc: { followers: 1 } });
    }

    const updatedUser = await User.findById(userId).select('following');
    res.json({ following: updatedUser?.following || [] });
  } catch (error) {
    console.error("Toggle Follow Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
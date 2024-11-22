import { Request, Response } from "express";
import User from "../Models/User";
import { config } from "../config";

export async function getUser(req: Request, res: Response) {
    const users = await User.find();
    res.json(users);
}

export async function blockUser(req: Request, res: Response) {
    const userId = req.body.userId;
    const user = await User.findOne({ userId });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    user.isBlocked = true;
    user.save();

    const allUsers = await User.find();

    res.json({ message: 'User blocked', users: allUsers });
}

export async function unblockUser(req: Request, res: Response) {
    const userId = req.body.userId;

    const user = await User.findOne({ userId });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    user.isBlocked = false;
    user.save();

    const allUsers = await User.find();

    res.json({ message: 'User unblocked', users: allUsers });
}

export async function updateApiKey(req: Request, res: Response) {
    const apiKey = req.body.apiKey;

    if (!apiKey) {
        res.status(400).json({ message: 'Please provide an api key' });
        return;
    }

    config.WEATHER_API_KEY = apiKey;

    res.json({ message: 'Api key updated' });
}
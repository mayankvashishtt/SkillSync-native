import { Request, Response } from 'express';
import Habit from '../models/Habit';

export const getHabits = async (req: any, res: Response) => {
    try {
        const habits = await Habit.find({ user: req.user.id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createHabit = async (req: any, res: Response) => {
    const { title, frequency, reminderTime } = req.body;

    try {
        const habit = await Habit.create({
            user: req.user.id,
            title,
            frequency,
            reminderTime
        });
        res.status(201).json(habit);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const updateHabit = async (req: Request, res: Response) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(habit);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteHabit = async (req: Request, res: Response) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ message: 'Habit removed' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const checkInHabit = async (req: Request, res: Response) => {
    try {
        const habit: any = await Habit.findById(req.params.id);
        if (habit) {
            habit.completedToday = true;
            habit.streak += 1;
            habit.logs.push({ date: new Date(), status: true });
            await habit.save();
            res.json(habit);
        } else {
            res.status(404).json({ message: 'Habit not found' });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

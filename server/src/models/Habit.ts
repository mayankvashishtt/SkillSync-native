import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    reminderTime: { type: String }, // e.g., "08:00 AM"
    streak: { type: Number, default: 0 },
    completedToday: { type: Boolean, default: false },
    logs: [{
        date: { type: Date, default: Date.now },
        status: { type: Boolean, default: true }
    }]
}, { timestamps: true });

export default mongoose.model('Habit', habitSchema);

import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true }
});

const skillSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    modules: [moduleSchema]
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);

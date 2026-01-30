import mongoose from 'mongoose';

const userSkillProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
    completedModules: [{ type: mongoose.Schema.Types.ObjectId }]
}, { timestamps: true });

export default mongoose.model('UserSkillProgress', userSkillProgressSchema);

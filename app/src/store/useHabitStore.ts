import { create } from 'zustand';
import api from '../services/api';

interface HabitState {
    habits: any[];
    loading: boolean;
    fetchHabits: () => Promise<void>;
    addHabit: (habit: any) => Promise<void>;
    checkIn: (id: string) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set, get) => ({
    habits: [],
    loading: false,
    fetchHabits: async () => {
        set({ loading: true });
        try {
            const res = await api.get('/habits');
            set({ habits: res.data });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },
    addHabit: async (habit) => {
        try {
            const res = await api.post('/habits', habit);
            set({ habits: [...get().habits, res.data] });
        } catch (error) {
            console.error(error);
        }
    },
    checkIn: async (id) => {
        try {
            const res = await api.post(`/habits/${id}/check-in`);
            set({
                habits: get().habits.map((h) => (h._id === id ? res.data : h)),
            });
        } catch (error) {
            console.error(error);
        }
    },
}));

import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import { Colors, Spacing, Typography } from '../src/theme/theme';
import { useHabitStore } from '../src/store/useHabitStore';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AddHabitModal() {
    const [title, setTitle] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [reminderTime, setReminderTime] = useState('08:00 AM');
    const addHabit = useHabitStore((state) => state.addHabit);
    const router = useRouter();

    const handleAdd = async () => {
        if (!title) {
            Alert.alert('Error', 'Please enter a habit title');
            return;
        }

        await addHabit({ title, frequency, reminderTime });
        router.back();
    };

    return (
        <View style={styles.container}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            
            <Text style={styles.title}>Add New Habit</Text>
            <Text style={styles.subtitle}>Commit to a new daily routine</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Habit Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Morning Meditation"
                    placeholderTextColor={Colors.textSecondary}
                    value={title}
                    onChangeText={setTitle}
                    autoFocus
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Frequency</Text>
                <View style={styles.tabBar}>
                    {['daily', 'weekly', 'monthly'].map((freq) => (
                        <TouchableOpacity 
                            key={freq}
                            style={[styles.tab, frequency === freq && styles.activeTab]}
                            onPress={() => setFrequency(freq)}
                        >
                            <Text style={[styles.tabText, frequency === freq && styles.activeTabText]}>
                                {freq.charAt(0).toUpperCase() + freq.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Reminder Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="08:00 AM"
                    placeholderTextColor={Colors.textSecondary}
                    value={reminderTime}
                    onChangeText={setReminderTime}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Create Habit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,
    },
    title: {
        ...Typography.h1,
        color: Colors.text,
        marginTop: Spacing.xl,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
    },
    inputContainer: {
        marginBottom: Spacing.lg,
    },
    label: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: Spacing.md,
        color: Colors.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: Colors.primary,
    },
    tabText: {
        ...Typography.caption,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    activeTabText: {
        color: 'white',
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        padding: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
    buttonText: {
        ...Typography.h3,
        color: 'white',
    },
    cancelButton: {
        padding: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    cancelButtonText: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
});

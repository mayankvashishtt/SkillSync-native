import React, { useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Colors, Spacing, Typography } from '../../src/theme/theme';
import { useHabitStore } from '../../src/store/useHabitStore';
import { useAuthStore } from '../../src/store/useAuthStore';
import { CheckCircle2, Flame, Trophy, Plus, Settings } from 'lucide-react-native';
import { useRouter, Link } from 'expo-router';
import { MotiView } from 'moti';

export default function DashboardScreen() {
    const { habits, fetchHabits, checkIn, loading } = useHabitStore();
    const { user } = useAuthStore();

    useEffect(() => {
        fetchHabits();
    }, []);

    const renderHabitItem = ({ item }: { item: any }) => (
        <MotiView 
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.habitCard}
        >
            <View style={styles.habitInfo}>
                <Text style={styles.habitTitle}>{item.title}</Text>
                <Text style={styles.habitSubtitle}>{item.frequency} • {item.streak} day streak</Text>
            </View>
            <TouchableOpacity 
                style={[styles.checkButton, item.completedToday && styles.checkedButton]}
                onPress={() => checkIn(item._id)}
                disabled={item.completedToday}
            >
                <CheckCircle2 size={24} color={item.completedToday ? Colors.success : Colors.textSecondary} />
            </TouchableOpacity>
        </MotiView>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Hello, {user?.name || 'User'}</Text>
                    <Text style={styles.dateText}>Ready to crush your goals today?</Text>
                </View>
                <TouchableOpacity>
                    <Settings size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Flame size={20} color={Colors.warning} />
                        <Text style={styles.statValue}>{user?.streak || 0}</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Trophy size={20} color={Colors.accent} />
                        <Text style={styles.statValue}>{user?.xp || 0}</Text>
                        <Text style={styles.statLabel}>Total XP</Text>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Daily Habits</Text>
                    <Link href="/modal" asChild>
                        <TouchableOpacity style={styles.addButton}>
                            <Plus size={20} color="white" />
                        </TouchableOpacity>
                    </Link>
                </View>

                {habits.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No habits yet. Start by adding one!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={habits}
                        renderItem={renderHabitItem}
                        keyExtractor={(item) => item._id}
                        scrollEnabled={false}
                    />
                )}

                <MotiView 
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 500 }}
                    style={styles.aiCard}
                >
                    <Text style={styles.aiTitle}>AI Insights</Text>
                    <Text style={styles.aiBody}>
                        You're most consistent at 8:00 AM. Keep maintaining your morning routine for 20% better success rate!
                    </Text>
                </MotiView>
                
                <View style={{ height: Spacing.xl }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.lg,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
        backgroundColor: 'transparent',
    },
    welcomeText: {
        ...Typography.h2,
        color: Colors.text,
    },
    dateText: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    statsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.xl,
        backgroundColor: 'transparent',
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: Spacing.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statValue: {
        ...Typography.h2,
        color: Colors.text,
        marginVertical: 4,
    },
    statLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
        backgroundColor: 'transparent',
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.text,
    },
    addButton: {
        backgroundColor: Colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    habitCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    habitInfo: {
        backgroundColor: 'transparent',
    },
    habitTitle: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.text,
    },
    habitSubtitle: {
        ...Typography.caption,
        color: Colors.textSecondary,
    },
    checkButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    checkedButton: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    emptyState: {
        padding: Spacing.xl,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    emptyText: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    aiCard: {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderRadius: 20,
        padding: Spacing.lg,
        marginTop: Spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    aiTitle: {
        ...Typography.h3,
        color: Colors.primary,
        marginBottom: Spacing.xs,
    },
    aiBody: {
        ...Typography.body,
        color: Colors.text,
        lineHeight: 22,
    },
});

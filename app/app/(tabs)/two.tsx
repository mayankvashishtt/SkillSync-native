import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Colors, Spacing, Typography } from '../../src/theme/theme';
import { BookOpen, ChevronRight, Award, Zap } from 'lucide-react-native';
import { MotiView } from 'moti';

const SKILLS = [
    { id: '1', title: 'Python Programming', level: 'Beginner', progress: 0.4, color: '#3776AB', icon: BookOpen },
    { id: '2', title: 'Digital Marketing', level: 'Intermediate', progress: 0.7, color: '#FF4500', icon: Zap },
    { id: '3', title: 'Public Speaking', level: 'Beginner', progress: 0.2, color: '#8B5CF6', icon: Award },
];

export default function SkillsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Skill Library</Text>
                <Text style={styles.subtitle}>What do you want to learn today?</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {SKILLS.map((skill, index) => (
                    <MotiView
                        key={skill.id}
                        from={{ opacity: 0, translateX: -20 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ delay: index * 100 }}
                        style={styles.skillCard}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: skill.color + '20' }]}>
                            <skill.icon size={24} color={skill.color} />
                        </View>
                        
                        <View style={styles.skillDetails}>
                            <Text style={styles.skillTitle}>{skill.title}</Text>
                            <Text style={styles.skillLevel}>{skill.level}</Text>
                            
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${skill.progress * 100}%`, backgroundColor: skill.color }]} />
                                </View>
                                <Text style={styles.progressText}>{Math.round(skill.progress * 100)}%</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.chevron}>
                            <ChevronRight size={20} color={Colors.textSecondary} />
                        </TouchableOpacity>
                    </MotiView>
                ))}

                <View style={styles.exploreContainer}>
                    <Text style={styles.exploreTitle}>Explore Categories</Text>
                    <View style={styles.categoriesGrid}>
                        {['Coding', 'Business', 'Design', 'Health', 'Music', 'Writing'].map((cat, i) => (
                            <TouchableOpacity key={cat} style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
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
        marginBottom: Spacing.xl,
        backgroundColor: 'transparent',
    },
    title: {
        ...Typography.h1,
        color: Colors.text,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textSecondary,
    },
    skillCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skillDetails: {
        flex: 1,
        marginLeft: Spacing.md,
        backgroundColor: 'transparent',
    },
    skillTitle: {
        ...Typography.body,
        fontWeight: '700',
        color: Colors.text,
    },
    skillLevel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    progressBar: {
        flex: 1,
        height: 6,
        backgroundColor: Colors.border,
        borderRadius: 3,
        marginRight: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 10,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    chevron: {
        marginLeft: Spacing.sm,
    },
    exploreContainer: {
        marginTop: Spacing.xl,
        backgroundColor: 'transparent',
    },
    exploreTitle: {
        ...Typography.h3,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
        backgroundColor: 'transparent',
    },
    categoryBadge: {
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    categoryText: {
        ...Typography.caption,
        color: Colors.text,
        fontWeight: '600',
    },
});

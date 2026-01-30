import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Colors, Spacing, Typography } from '../../src/theme/theme';
import { useAuthStore } from '../../src/store/useAuthStore';
import { LogOut, User, Bell, Shield, Moon, ChevronRight } from 'lucide-react-native';
import { MotiView } from 'moti';

export default function ProfileScreen() {
    const { user, logout } = useAuthStore();

    const MenuItem = ({ icon: Icon, title, value, color = Colors.text }: any) => (
        <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconBox, { backgroundColor: color + '10' }]}>
                    <Icon size={20} color={color} />
                </View>
                <Text style={styles.menuItemTitle}>{title}</Text>
            </View>
            <View style={styles.menuItemRight}>
                {value && <Text style={styles.menuItemValue}>{value}</Text>}
                <ChevronRight size={18} color={Colors.textSecondary} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <MotiView 
                    from={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={styles.profileCard}
                >
                    <View style={styles.avatarContainer}>
                        <User size={40} color={Colors.primary} />
                    </View>
                    <Text style={styles.userName}>{user?.name || 'User'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
                    
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </MotiView>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Account Settings</Text>
                    <MenuItem icon={Bell} title="Notifications" value="On" color={Colors.accent} />
                    <MenuItem icon={Shield} title="Privacy & Security" color={Colors.success} />
                    <MenuItem icon={Moon} title="Dark Mode" value="System" color={Colors.primary} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>More</Text>
                    <MenuItem icon={User} title="About SkillSync" />
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <LogOut size={20} color={Colors.error} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{ height: 40 }} />
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
    profileCard: {
        backgroundColor: Colors.surface,
        borderRadius: 24,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    userName: {
        ...Typography.h2,
        color: Colors.text,
    },
    userEmail: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
    },
    editButton: {
        backgroundColor: Colors.primary + '20',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.sm,
        borderRadius: 12,
    },
    editButtonText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    section: {
        marginBottom: Spacing.xl,
        backgroundColor: 'transparent',
    },
    sectionLabel: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: 16,
        marginBottom: Spacing.xs,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    menuItemTitle: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '500',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    menuItemValue: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginRight: Spacing.xs,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.error + '10',
        padding: Spacing.md,
        borderRadius: 16,
        marginTop: Spacing.sm,
    },
    logoutText: {
        ...Typography.body,
        color: Colors.error,
        fontWeight: '600',
        marginLeft: Spacing.md,
    },
});

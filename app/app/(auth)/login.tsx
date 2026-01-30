import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Colors, Spacing, Typography } from '../../src/theme/theme';
import { useAuthStore } from '../../src/store/useAuthStore';
import api from '../../src/services/api';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const res = await api.post('/auth/login', { email, password });
            setUser(res.data, res.data.token);
            router.replace('/(tabs)');
        } catch (error: any) {
            console.log('Login Error:', error);
            Alert.alert('Error', error.response?.data?.message || error.message || 'Login failed');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <MotiView 
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                style={styles.form}
            >
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue your progress</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@mail.com"
                        placeholderTextColor={Colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor={Colors.textSecondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                    <Text style={styles.linkText}>
                        Don't have an account? <Text style={styles.linkHighlight}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </MotiView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        padding: Spacing.lg,
        justifyContent: 'center',
    },
    form: {
        width: '100%',
    },
    title: {
        ...Typography.h1,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
    },
    inputContainer: {
        marginBottom: Spacing.md,
    },
    label: {
        ...Typography.caption,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
        marginLeft: 4,
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: Spacing.md,
        color: Colors.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        padding: Spacing.md,
        alignItems: 'center',
        marginTop: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    buttonText: {
        ...Typography.h3,
        color: 'white',
    },
    linkText: {
        ...Typography.body,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    linkHighlight: {
        color: Colors.primary,
        fontWeight: '600',
    },
});

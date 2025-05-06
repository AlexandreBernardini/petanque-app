import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleStartTournament = () => {
        router.push('/tournament'); // Tu pourras créer cette page ensuite
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuIcon} onPress={logout}>
                <Ionicons name="menu" size={30} color="#fff" />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.welcomeText}>Bienvenue {user?.nom} 👋</Text>
            <Text style={styles.subtitle}>Prêt pour un tournoi de tir ? 🎯</Text>

            <TouchableOpacity style={styles.button} onPress={handleStartTournament}>
                <Text style={styles.buttonText}>Lancer un tournoi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 20,
        justifyContent: 'center',
    },
    menuIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 200,
        height: 140,
        resizeMode: 'contain',
    },
    welcomeText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 16,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#00b32d',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


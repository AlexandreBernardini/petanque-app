import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register() {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.77.239:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.message || 'Erreur lors de l’inscription');
                return;
            }

            alert('Compte créé avec succès !');
            router.push('/login');
        } catch (err) {
            alert('Erreur de connexion');
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Nom"
                placeholderTextColor="#999"
                value={nom}
                onChangeText={setNom}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
                <LinearGradient
                    colors={['#00b32d', '#0066cc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.bottomLink}>
                    tu as un compte ? <Text style={{ textDecorationLine: 'underline' }}>Connecte toi</Text>
                </Text>
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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        marginVertical: 8,
    },
    buttonContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: 10,
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 50,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomLink: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 20,
        fontSize: 14,
    },
});

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        setError('');

        try {
            const response = await fetch('http://192.168.77.239:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Erreur de connexion');
                return;
            }

            Alert.alert('Succès', 'Connexion réussie');
            console.log('Utilisateur connecté :', data.user);
            router.push('/'); // ou une autre page

        } catch (err) {
            setError("Erreur serveur. Veuillez réessayer.");
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
                style={styles.input}
            />

            <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
                style={styles.input}
            />

            {error !== '' && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                <LinearGradient
                    colors={['#00b32d', '#0066cc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Se connecter</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.bottomLink}>
                    Pas encore de compte ? <Text style={{ textDecorationLine: 'underline' }}>S'inscrire</Text>
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
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

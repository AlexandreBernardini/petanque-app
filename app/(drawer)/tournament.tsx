import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

interface User {
    id: number;
    nom: string;
    email: string;
}

export default function Tournament() {
    const { token, user } = useAuth();
    const router = useRouter();

    const [friends, setFriends] = useState<User[]>([]);
    const [selectedPlayers, setSelectedPlayers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await fetch('http://192.168.101.239:3001/api/friends', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFriends(data);
        } catch (err) {
            console.error("Erreur de chargement des amis :", err);
        } finally {
            setLoading(false);
        }
    };

    const togglePlayer = (player: User) => {
        setSelectedPlayers((prev) =>
            prev.some((p) => p.id === player.id)
                ? prev.filter((p) => p.id !== player.id)
                : [...prev, player]
        );
    };

    const launchGame = async () => {
        const allPlayers = [user!, ...selectedPlayers];

        try {
            const response = await fetch('http://192.168.101.239:3001/api/parties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ joueurIds: allPlayers.map((p) => p.id) }),
            });

            const data = await response.json();

            if (response.ok) {
                const partieId = data.id;

                // Ensuite, on passe vers la page des ateliers avec l'ID
                router.push({
                    pathname: '/game',
                    params: { partieId: partieId.toString() }, // ou `${partieId}`
                });
            } else {
                alert(data.message || 'Erreur lors de la création de la partie');
            }
        } catch (error) {
            console.error('Erreur lancement partie :', error);
            alert('Erreur réseau');
        }
    };


    const isLaunchDisabled = selectedPlayers.length < 1; // toi + au moins 1 pote

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prépare ton tournoi 🎯</Text>

            {loading ? (
                <ActivityIndicator color="#00b32d" size="large" />
            ) : (
                <>
                    <FlatList
                        data={friends}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            const isSelected = selectedPlayers.some((p) => p.id === item.id);
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.friendItem,
                                        isSelected && styles.friendSelected,
                                    ]}
                                    onPress={() => togglePlayer(item)}
                                >
                                    <Text style={styles.friendText}>
                                        {item.nom} {isSelected ? '✅' : ''}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            isLaunchDisabled && styles.buttonDisabled,
                        ]}
                        onPress={launchGame}
                        disabled={isLaunchDisabled}
                    >
                        <Text style={styles.buttonText}>Lancer la partie</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    friendItem: {
        backgroundColor: '#222',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    friendSelected: {
        backgroundColor: '#00b32d',
    },
    friendText: {
        color: '#fff',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#00b32d',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#555',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

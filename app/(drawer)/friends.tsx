import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-root-toast'; // ✅ Import du toast
import { useAuth } from '@/contexts/AuthContext';

interface User {
    id: number;
    nom: string;
    email: string;
}

export default function Friends() {
    const { token, user } = useAuth();
    const [friends, setFriends] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchFriends();
        fetchAllUsers();
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await fetch('http://192.168.77.239:3001/api/friends', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFriends(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des amis", error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const res = await fetch('http://192.168.77.239:3001/api/users/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setAllUsers(data);
        } catch (err) {
            console.error("Erreur chargement des utilisateurs", err);
        }
    };

    const addFriend = async (name: string) => {
        try {
            const response = await fetch('http://192.168.77.239:3001/api/friends/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ friendName: name }),
            });

            const data = await response.json();
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Ami ajouté !',
                    text2: 'Tu joueras bientôt avec 🐷 Hugo !',
                    position: 'bottom',
                });
                fetchFriends();
            } else {
                Toast.show(data.message || 'Erreur lors de l’ajout 😢', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: '#d00000',
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'ami", error);
        }
    };

    const removeFriend = async (friendId: number) => {
        try {
            const res = await fetch(`http://192.168.77.239:3001/api/friends/${friendId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                Toast.show(data.message || 'Ami supprimé 💔', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: '#d00000',
                });
                fetchFriends();
            } else {
                Toast.show(data.message || 'Erreur lors de la suppression', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: '#ff8800',
                });
            }
        } catch (error) {
            console.error("Erreur suppression ami", error);
        }
    };

    const friendIds = friends.map((f) => f.id);
    const nonFriends = allUsers.filter(
        (u) => !friendIds.includes(u.id) && u.id !== user?.id
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes amis</Text>

            <FlatList
                data={friends}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.friendItem}>
                        <Text style={styles.friendText}>{item.nom}</Text>
                        <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => removeFriend(item.id)}
                        >
                            <Text style={{ color: '#fff' }}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Text style={styles.subTitle}>Ajouter de nouveaux amis</Text>

            <FlatList
                data={nonFriends}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.friendText}>{item.nom}</Text>
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => addFriend(item.nom)}
                        >
                            <Text style={{ color: '#fff' }}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#111',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
    },
    friendItem: {
        backgroundColor: '#222',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    friendText: {
        color: '#fff',
        fontSize: 18,
    },
    userItem: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addBtn: {
        backgroundColor: '#00b32d',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 30,
    },
    removeBtn: {
        backgroundColor: '#d00000',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 30,
    }

});

import React, { useState, useEffect } from 'react';
import {    View,    Text,    StyleSheet,    TouchableOpacity,      FlatList,    Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

type Tir = {
    user: { nom: string };
    distance: number;
    points: number;
};

export default function Atelier1() {
    const { token, user } = useAuth();
    const { partieId } = useLocalSearchParams(); // récupéré via router.push
    const [joueurs, setJoueurs] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [points, setPoints] = useState('');
    const [tirHistorique, setTirHistorique] = useState([]);

    useEffect(() => {
        fetchJoueurs();
    }, []);

    const fetchJoueurs = async () => {
        try {
            const res = await fetch(`http://192.168.101.239:3001/api/parties/${partieId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            console.log('Réponse de /parties/:id =>', JSON.stringify(data, null, 2));
            setJoueurs(data.joueurs.map((j: any) => j.user));
        } catch (err) {
            console.error('Erreur chargement joueurs', err);
        }
    };

    const enregistrerTir = async () => {
        if (!selectedPlayer || !distance || !points) {
            Alert.alert('Tous les champs sont requis');
            return;
        }

        try {
            const res = await fetch('http://192.168.101.239:3001/api/parties/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    partieId: Number(partieId),
                    userId: selectedPlayer,
                    atelier: 1,
                    distance,
                    points: Number(points),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert('🎯 Tir enregistré !');
                setTirHistorique((prev) => [...prev, data]);
                setPoints('');
            } else {
                Alert.alert(data.message || 'Erreur');
            }
        } catch (err) {
            console.error('Erreur enregistrement tir', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atelier 1 - Boule seule</Text>

            <Text style={styles.label}>Joueur :</Text>
            <FlatList
                data={joueurs}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.playerBtn,
                            selectedPlayer === item.id && styles.selected,
                        ]}
                        onPress={() => setSelectedPlayer(item.id)}
                    >
                        <Text style={styles.playerText}>{item.nom}</Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={styles.label}>Distance :</Text>
            <View style={styles.row}>
                {[6, 7, 8, 9].map((d) => (
                    <TouchableOpacity
                        key={d}
                        style={[styles.distanceBtn, distance === d && styles.selected]}
                        onPress={() => setDistance(d)}
                    >
                        <Text style={styles.playerText}>{d}m</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Points marqués :</Text>
            <View style={styles.row}>
                {[0, 1, 3, 5].map((pt) => (
                    <TouchableOpacity
                        key={pt}
                        style={[
                            styles.distanceBtn,
                            Number(points) === pt && styles.selected,
                        ]}
                        onPress={() => setPoints(pt.toString())}
                    >
                        <Text style={styles.playerText}>{pt} pts</Text>
                    </TouchableOpacity>
                ))}
            </View>


            <TouchableOpacity style={styles.submitBtn} onPress={enregistrerTir}>
                <Text style={styles.submitText}>Enregistrer le tir</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Historique :</Text>
            <FlatList
                data={tirHistorique}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }: { item: Tir }) => (
                    <Text style={styles.historiqueItem}>
                        {item.user?.nom ?? 'Inconnu'} — {item.distance}m — {item.points} pts
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 20,
        paddingTop: 40,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        color: '#ccc',
        marginTop: 15,
        marginBottom: 5,
    },
    playerBtn: {
        padding: 10,
        backgroundColor: '#333',
        marginRight: 10,
        borderRadius: 10,
    },
    selected: {
        backgroundColor: '#00b32d',
    },
    playerText: {
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    distanceBtn: {
        padding: 10,
        backgroundColor: '#333',
        marginRight: 10,
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderRadius: 10,
        height: 50,
        marginBottom: 20,
    },
    submitBtn: {
        backgroundColor: '#00b32d',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
        marginTop:20,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    historiqueItem: {
        color: '#ccc',
        marginVertical: 2,
    },
});

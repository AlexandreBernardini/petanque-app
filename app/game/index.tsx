import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const ateliers = [
    { id: 1, title: 'Boule seule', route: 'atelier1' },
    { id: 2, title: 'Boule derrière le but', route: 'atelier2' },
    { id: 3, title: 'Boule entre obstacles', route: 'atelier3' },
    { id: 4, title: 'Boule derrière un obstacle', route: 'atelier4' },
    { id: 5, title: 'Tir sur le but', route: 'atelier5' },
];

export default function GameMenu() {
    const router = useRouter();
    const { partieId } = useLocalSearchParams();

    const goToAtelier = (route: string, partieId: string | string[]) => {
        router.push({
            pathname: '/game/atelier1',
            params: { partieId: partieId.toString() },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choisis ton atelier 🎯</Text>

            <FlatList
                data={ateliers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => goToAtelier(item.route, partieId)}
                    >
                        <Text style={styles.buttonText}>{item.title}</Text>
                    </TouchableOpacity>
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
        paddingTop: 60,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#00b32d',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

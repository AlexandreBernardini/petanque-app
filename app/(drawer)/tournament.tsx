import { View, Text, StyleSheet } from 'react-native';

export default function Tournament() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prépare ton tournoi 🎯</Text>
            {/* Ajoute tes composants ici */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

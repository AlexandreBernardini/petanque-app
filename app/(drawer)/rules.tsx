import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

export default function Rules() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Règles du Tir de Précision</Text>

            <Text style={styles.sectionTitle}>🎯 Objectif</Text>
            <Text style={styles.paragraph}>
                Le tir de précision est une épreuve individuelle consistant à atteindre des cibles spécifiques dans des configurations variées. Chaque joueur effectue 20 tirs répartis sur 5 ateliers, à des distances de 6, 7, 8 et 9 mètres.
            </Text>

            <Text style={styles.sectionTitle}>📏 Matériel</Text>
            <Text style={styles.paragraph}>
                - Boules cibles : diamètre 74 mm, poids 700 g, couleur claire.
                {'\n'}- Boules obstacles : mêmes caractéristiques, couleur foncée.
                {'\n'}- Buts : diamètre 30 mm, en buis, couleur claire.
                {'\n'}- Cercles de tir : 1 mètre de diamètre.
                {'\n'}- Cercles de lancer : 50 cm de diamètre, placés à 6, 7, 8 et 9 mètres.
            </Text>

            <Text style={styles.sectionTitle}>🧩 Déroulement</Text>
            <Text style={styles.paragraph}>
                Chaque joueur réalise 4 tirs par atelier, soit 20 tirs au total. Les ateliers sont :
                {'\n'}1. Boule seule.
                {'\n'}2. Boule derrière le but.
                {'\n'}3. Boule entre deux obstacles.
                {'\n'}4. Boule derrière un obstacle.
                {'\n'}5. Tir sur le but.
            </Text>

            <Text style={styles.sectionTitle}>🏅 Attribution des points</Text>
            <Text style={styles.paragraph}>
                - 5 points : la boule cible est sortie du cercle sans que la boule de tir ne sorte.
                {'\n'}- 3 points : la boule cible et la boule de tir sortent du cercle sans toucher les obstacles.
                {'\n'}- 1 point : la boule cible est touchée sans sortir du cercle.
                {'\n'}- 0 point : tir non valable ou non conforme.
            </Text>

            <Text style={styles.sectionTitle}>📚 Référence</Text>
            <Text style={styles.paragraph}>
                Pour plus de détails, consultez le règlement officiel de la FIPJP :
                {'\n'}https://www.fipjp.org/images/pdf/2021/Tir-de-precision2020.pdf
            </Text>
        </ScrollView>
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
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 20,
    },
});

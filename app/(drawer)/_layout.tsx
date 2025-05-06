import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{
                headerStyle: { backgroundColor: '#111' },
                headerTintColor: '#fff',
                drawerStyle: { backgroundColor: '#111' },
                drawerLabelStyle: { color: '#fff' },
            }}
        >
            <Drawer.Screen name="tournament" options={{ title: 'Lancer une partie' }} />
            <Drawer.Screen name="friends" options={{ title: 'Mes amis' }} />
            <Drawer.Screen name="logout" options={{ title: 'Se déconnecter' }} />
        </Drawer>
    );
}

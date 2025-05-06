import { Slot, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';



export default function RootLayout() {
    return (
        <AuthProvider>
            <AppNavigator />
            <Toast />
        </AuthProvider>
    );
}

function AppNavigator() {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (token) {
                router.replace('/(drawer)/tournament');
            } else {
                router.replace('/login');
            }
        }
    }, [token, loading]);

    return <Slot />;
}

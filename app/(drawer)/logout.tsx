import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function Logout() {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        logout().then(() => {
            router.replace('/login');
        });
    }, []);

    return null;
}

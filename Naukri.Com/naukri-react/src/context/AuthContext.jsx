import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('loggedInUser');
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(u => u.email === email && u.password === password);
        if (!validUser) return false;
        localStorage.setItem('loggedInUser', JSON.stringify(validUser));
        setUser(validUser);
        return true;
    };

    const register = (name, email, password, role) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) return { success: false, message: 'User already exists with this email!' };
        users.push({ name, email, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('loggedInUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

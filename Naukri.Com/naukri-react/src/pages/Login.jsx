import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            navigate('/');
        } else {
            alert('Invalid Email or Password!');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-bg-shape-1"></div>
            <div className="auth-bg-shape-2"></div>

            <div className="auth-card">
                <div className="auth-banner">
                    <h2>Welcome Back</h2>
                    <p>Log in to continue your success story and apply to top companies hiring today.</p>
                </div>

                <div className="auth-form-wrapper">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="loginEmail">Email Address</label>
                            <input type="email" id="loginEmail" placeholder="name@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="loginPassword">Password</label>
                            <input type="password" id="loginPassword" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <input type="submit" value="Sign In" />
                    </form>

                    <div className="auth-links">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </div>
                    <div className="auth-links" style={{ marginTop: '10px' }}>
                        <Link to="/" style={{ color: 'var(--light-text)', fontWeight: 'normal' }}>&larr; Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

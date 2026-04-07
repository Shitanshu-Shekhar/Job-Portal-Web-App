import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Job Seeker');
    const { register, user } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/" replace />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const result = register(name, email, password, role);
        if (result.success) {
            alert('Registration Successful! Please login.');
            navigate('/login');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-bg-shape-1"></div>
            <div className="auth-bg-shape-2"></div>

            <div className="auth-card">
                <div className="auth-banner">
                    <h2>Start Your Journey</h2>
                    <p>Join India's No.1 Job Portal and unlock thousands of premium opportunities to accelerate your career growth.</p>
                </div>

                <div className="auth-form-wrapper">
                    <h3>Create Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="regName">Full Name</label>
                            <input type="text" id="regName" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="regEmail">Email Address</label>
                            <input type="email" id="regEmail" placeholder="name@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="regPassword">Password</label>
                            <input type="password" id="regPassword" placeholder="Create a strong password" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="regConfirmPassword">Confirm Password</label>
                            <input type="password" id="regConfirmPassword" placeholder="Re-enter password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="regRole">I am a</label>
                            <select id="regRole" value={role} onChange={e => setRole(e.target.value)}>
                                <option>Job Seeker</option>
                                <option>Employer</option>
                            </select>
                        </div>
                        <input type="submit" value="Register Now" />
                    </form>

                    <div className="auth-links">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                    <div className="auth-links" style={{ marginTop: '10px' }}>
                        <Link to="/" style={{ color: 'var(--light-text)', fontWeight: 'normal' }}>&larr; Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

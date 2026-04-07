import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <img
                    src="/naukri.png"
                    alt="Naukri"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const p = e.target.nextElementSibling;
                        if (p) {
                            p.style.fontSize = '22px';
                            p.style.color = 'var(--primary)';
                            p.style.fontWeight = '700';
                        }
                    }}
                />
                <p>India's No.1 Job Portal</p>
            </div>

            <nav>
                <Link to="/home">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/companies">Companies</Link>
                <Link to="/services">Services</Link>
                {!user ? (
                    <>
                        <Link to="/login" className="btn-login">Login</Link>
                        <Link to="/register" className="btn-register">Register</Link>
                    </>
                ) : (
                    <button className="btn-login" onClick={handleLogout} style={{ cursor: 'pointer', background: 'none', border: '1.5px solid var(--primary)', fontFamily: 'inherit', fontSize: '15px', fontWeight: 500 }}>
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
}

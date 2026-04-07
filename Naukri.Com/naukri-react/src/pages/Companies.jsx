import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Companies() {
    const companies = [
        'Infosys', 'Tata Consultancy Services (TCS)', 'Wipro',
        'HCL Technologies', 'Accenture', 'Cognizant',
        'Tech Mahindra', 'IBM India'
    ];

    return (
        <>
            <Header />
            <main>
                <section className="main-section" style={{ maxWidth: '700px' }}>
                    <div style={{
                        background: 'white',
                        padding: '40px',
                        borderRadius: 'var(--radius-xl)',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid #f1f5f9'
                    }}>
                        <h2 style={{ textAlign: 'left', color: 'var(--primary)', marginBottom: '20px' }}>Top Hiring Companies</h2>
                        <ul style={{ fontSize: '18px', lineHeight: '2', paddingLeft: '20px' }}>
                            {companies.map(c => <li key={c} style={{ color: 'var(--dark)' }}>{c}</li>)}
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

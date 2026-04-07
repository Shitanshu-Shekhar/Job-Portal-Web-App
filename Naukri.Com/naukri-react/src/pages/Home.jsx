import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <section className="hero" style={{ paddingBottom: '60px' }}>
                    <h1>Welcome to Job Portal <span>Naukri.com</span></h1>
                    <div style={{ margin: '30px auto' }}>
                        <img
                            src="/naukri.png"
                            alt="logo"
                            style={{ height: '250px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                    <p className="highlight" style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>
                        India's No.1 Job Portal to find your dream job.
                    </p>
                    <p style={{ color: 'var(--light-text)' }}>
                        Search jobs, apply online, and connect with top companies.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}

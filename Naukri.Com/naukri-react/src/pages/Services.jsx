import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/services.css';

export default function Services() {
    const services = [
        {
            title: 'Resume Building',
            desc: "Our experts will help you craft a professional resume that highlights your strengths and catches recruiters' attention instantly."
        },
        {
            title: 'Interview Preparation',
            desc: 'Get access to 1-on-1 mock interviews, technical coding rounds, and HR behavioral questions to ace your next job interview.'
        },
        {
            title: 'Career Counseling',
            desc: 'Unsure about your career path? Speak to our seasoned industry professionals to find the right trajectory for your skills.'
        },
        {
            title: 'Skill Certifications',
            desc: 'Enroll in our verified technical and non-technical certification exams to boost your profile visibility by 300%.'
        }
    ];

    return (
        <>
            <Header />
            <main>
                <section className="services-section">
                    <h1>Our Premium Services</h1>
                    <div className="services-container">
                        {services.map(s => (
                            <div className="service-card" key={s.title}>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

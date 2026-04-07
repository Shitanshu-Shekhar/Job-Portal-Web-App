import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/jobList.css';

export default function JobList() {
    const staticJobs = [
        { title: 'Software Developer', company: 'Infosys', location: 'Bangalore', experience: '0–2 Years', skills: 'C++, Java, SQL' },
        { title: 'Python Developer', company: 'TCS', location: 'Pune', experience: '1–3 Years', skills: 'Python, Django, SQL' },
        { title: 'Frontend Developer', company: 'Wipro', location: 'Hyderabad', experience: 'Fresher', skills: 'HTML, CSS, JavaScript' },
        { title: 'Java Developer', company: 'Accenture', location: 'Gurgaon', experience: '2–4 Years', skills: 'Java, Spring Boot, MySQL' },
    ];

    return (
        <>
            <Header />
            <main>
                <section className="main-section">
                    <div className="job-list-container">
                        <h2>Latest Job Openings</h2>
                        {staticJobs.map((job, idx) => (
                            <div className={`job-list-card ${idx === staticJobs.length - 1 ? 'last' : ''}`} key={idx}>
                                <h3>{job.title}</h3>
                                <p><strong>Company:</strong> {job.company}</p>
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Experience:</strong> {job.experience}</p>
                                <p><strong>Skills:</strong> {job.skills}</p>
                                <a href="/apply">Apply Now</a>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

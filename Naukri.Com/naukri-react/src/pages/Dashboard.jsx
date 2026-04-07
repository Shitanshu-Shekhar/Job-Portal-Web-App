import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import JobCard from '../components/JobCard';
import defaultJobs from '../data/defaultJobs';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({ role: '', company: '', location: '', experience: '' });

    useEffect(() => {
        const stored = localStorage.getItem('jobs');
        setJobs(stored ? JSON.parse(stored) : defaultJobs);
    }, []);

    const saveJobs = (updatedJobs) => {
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    const handleSearch = (skill, location) => {
        navigate(`/search?skill=${encodeURIComponent(skill)}&location=${encodeURIComponent(location)}`);
    };

    const handlePostJob = (e) => {
        e.preventDefault();
        if (editingJob) {
            const updated = jobs.map(j => j.id === editingJob.id ? { ...editingJob, ...formData } : j);
            saveJobs(updated);
            setEditingJob(null);
        } else {
            const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
            saveJobs([...jobs, { id: newId, ...formData }]);
        }
        setFormData({ role: '', company: '', location: '', experience: '' });
    };

    const handleEdit = (job) => {
        setEditingJob(job);
        setFormData({ role: job.role, company: job.company, location: job.location, experience: job.experience });
        document.getElementById('postJobForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            saveJobs(jobs.filter(j => j.id !== id));
        }
    };

    return (
        <>
            <Header />
            <main>
                <section className="hero">
                    <h1>Find Your <span>Dream Job</span> Now</h1>
                    {user ? (
                        <p>Welcome back, <strong>{user.name}</strong>! Search from thousands of premium jobs across India.</p>
                    ) : (
                        <p>Search from thousands of premium jobs across India and accelerate your career growth today.</p>
                    )}
                    <SearchForm onSearch={handleSearch} />
                </section>

                <section className="main-section categories">
                    <h2>Popular Job Categories</h2>
                    <div className="category-list">
                        {[
                            { icon: 'fa-code', label: 'IT & Software' },
                            { icon: 'fa-wallet', label: 'Banking & Finance' },
                            { icon: 'fa-bullhorn', label: 'Marketing & Sales' },
                            { icon: 'fa-pen-nib', label: 'Design & Creative' },
                            { icon: 'fa-users-gear', label: 'HR & Operations' },
                            { icon: 'fa-database', label: 'Data Science' },
                        ].map(cat => (
                            <div className="category" key={cat.label}>
                                <i className={`fa-solid ${cat.icon}`} style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '24px', display: 'block' }}></i>
                                {cat.label}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="admin-section">
                    <h2>Post a New Job <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--light-text)', display: 'block', marginTop: '5px' }}>(Admin Panel)</span></h2>
                    <form id="postJobForm" className="post-job-form" onSubmit={handlePostJob}>
                        <input type="text" placeholder="Job Role (e.g., Full Stack Developer)" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                        <input type="text" placeholder="Company Name" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                        <input type="text" placeholder="Location" required value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        <input type="text" placeholder="Experience (e.g., 0-2 Years)" required value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                        <button type="submit" className="btn">{editingJob ? 'Update Job' : 'Post Job'}</button>
                    </form>
                </section>

                <section className="main-section job-section" id="jobSection">
                    <h2>Latest Job Openings</h2>
                    <div className="job-cards-container">
                        {jobs.length === 0 ? (
                            <div className="empty-state">
                                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '40px', color: '#cbd5e1', marginBottom: '15px' }}></i>
                                <h3>No jobs found!</h3>
                                <p>Try adjusting your search criteria or looking for a different role/location.</p>
                            </div>
                        ) : (
                            jobs.map(job => (
                                <JobCard key={job.id} job={job} onEdit={handleEdit} onDelete={handleDelete} />
                            ))
                        )}
                    </div>
                </section>

                <section className="main-section companies">
                    <h2>Top Hiring Companies</h2>
                    <div className="company-list">
                        <span><i className="fa-brands fa-microsoft" style={{ marginRight: '8px' }}></i>Microsoft</span>
                        <span><i className="fa-brands fa-google" style={{ marginRight: '8px' }}></i>Google</span>
                        <span><i className="fa-brands fa-aws" style={{ marginRight: '8px' }}></i>Amazon</span>
                        <span>Infosys</span>
                        <span>TCS</span>
                        <span>Accenture</span>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

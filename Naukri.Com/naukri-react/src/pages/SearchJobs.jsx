import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import JobCard from '../components/JobCard';
import defaultJobs from '../data/defaultJobs';

export default function SearchJobs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [title, setTitle] = useState('All Opening Jobs');

    const skillParam = searchParams.get('skill') || '';
    const locationParam = searchParams.get('location') || '';

    useEffect(() => {
        const stored = localStorage.getItem('jobs');
        const allJobs = stored ? JSON.parse(stored) : defaultJobs;
        setJobs(allJobs);
    }, []);

    useEffect(() => {
        filterJobs(skillParam, locationParam);
    }, [jobs, skillParam, locationParam]);

    const filterJobs = (skill, location) => {
        const s = skill.toLowerCase().trim();
        const l = location.toLowerCase().trim();

        const filtered = jobs.filter(job => {
            const text = `${job.role} ${job.company}`.toLowerCase();
            const locText = job.location.toLowerCase();
            return (s === '' || text.includes(s)) && (l === '' || locText.includes(l));
        });

        if (s || l) {
            let t = 'Results for ';
            if (s) t += `"${s}" `;
            if (s && l) t += 'in ';
            if (l) t += `"${l}"`;
            setTitle(t);
        } else {
            setTitle('All Opening Jobs');
        }

        setFilteredJobs(filtered);
    };

    const handleSearch = (skill, location) => {
        setSearchParams({ skill, location });
    };

    const handleEdit = (job) => {
        alert('Please navigate to the main Dashboard to edit jobs.');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            const updatedJobs = jobs.filter(j => j.id !== id);
            setJobs(updatedJobs);
            localStorage.setItem('jobs', JSON.stringify(updatedJobs));
        }
    };

    return (
        <>
            <Header />
            <main>
                <section className="hero" style={{ padding: '40px 20px' }}>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--dark)' }}>Search Results</h2>
                    <p>Find matches for your dream job right here.</p>
                    <SearchForm onSearch={handleSearch} initialSkill={skillParam} initialLocation={locationParam} inline={true} />
                </section>

                <section className="main-section job-section">
                    <h2>{title}</h2>
                    <div className="job-cards-container">
                        {filteredJobs.length === 0 ? (
                            <div className="empty-state">
                                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '40px', color: '#cbd5e1', marginBottom: '15px' }}></i>
                                <h3>No jobs found!</h3>
                                <p>Try adjusting your search criteria or looking for a different role/location.</p>
                            </div>
                        ) : (
                            filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} onEdit={handleEdit} onDelete={handleDelete} />
                            ))
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

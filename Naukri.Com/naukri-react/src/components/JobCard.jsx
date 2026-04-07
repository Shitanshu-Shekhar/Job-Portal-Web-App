import { Link } from 'react-router-dom';

export default function JobCard({ job, onEdit, onDelete }) {
    return (
        <div className="job-card">
            <h3>{job.role}</h3>
            <div className="company-name">
                <i className="fa-solid fa-building" style={{ marginRight: '8px' }}></i>
                {job.company}
            </div>
            <div className="job-details">
                <span><i className="fa-solid fa-location-dot"></i> {job.location}</span>
                <span><i className="fa-solid fa-briefcase"></i> {job.experience}</span>
            </div>
            <div className="job-card-actions">
                <Link to="/apply" className="btn-apply">Apply Now</Link>
                <button className="btn-edit" onClick={() => onEdit(job)}>Edit</button>
                <button className="btn-delete" title="Delete Job" onClick={() => onDelete(job.id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
}

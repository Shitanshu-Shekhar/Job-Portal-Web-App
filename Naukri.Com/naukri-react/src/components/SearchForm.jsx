import { useState } from 'react';

export default function SearchForm({ onSearch, initialSkill = '', initialLocation = '', inline = false }) {
    const [skill, setSkill] = useState(initialSkill);
    const [location, setLocation] = useState(initialLocation);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(skill.trim(), location.trim());
    };

    const handleInput = () => {
        if (inline) {
            onSearch(skill.trim(), location.trim());
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter Skills, Designations or Companies"
                value={skill}
                onChange={(e) => { setSkill(e.target.value); }}
                onInput={handleInput}
            />
            <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => { setLocation(e.target.value); }}
                onInput={handleInput}
            />
            <button type="submit">Search Jobs</button>
        </form>
    );
}

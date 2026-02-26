
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("regConfirmPassword").value;
        const role = document.getElementById("regRole").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(user => user.email === email)) {
            alert("User already exists with this email!");
            return;
        }

        users.push({ name, email, password, role });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful! Please login.");
        window.location.href = "login.html";
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(user => user.email === email && user.password === password);

        if (!validUser) {
            alert("Invalid Email or Password!");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        alert("Login Successful! Redirecting...");
        window.location.href = "naukri.html";
    });
}


window.logout = function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
};


const isProtectedPage = window.location.pathname.includes("naukri.html") || window.location.pathname.includes("search-jobs.html");
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (isProtectedPage && !user) {

    window.location.href = "login.html";
} else if ((window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html")) && user) {
  
    window.location.href = "naukri.html";
}

let defaultJobs = [
    { id: 1, role: "Full Stack Developer", company: "Infosys", location: "Bangalore", experience: "0–2 Years" },
    { id: 2, role: "Python Developer", company: "TCS", location: "Pune", experience: "1–3 Years" },
    { id: 3, role: "Frontend UI/UX Developer", company: "Google", location: "Hyderabad", experience: "Fresher" },
    { id: 4, role: "Data Scientist", company: "Microsoft", location: "Bangalore", experience: "2-5 Years" },
    { id: 5, role: "Cloud Architect", company: "Amazon", location: "Remote", experience: "4-8 Years" },
    { id: 6, role: "Product Manager", company: "Accenture", location: "Delhi NCR", experience: "5+ Years" },
    { id: 7, role: "Backend Systems Engineer", company: "Netflix", location: "Pune", experience: "3-6 Years" },
    { id: 8, role: "Android Mobile Developer", company: "Samsung", location: "Noida", experience: "Fresher" },
    { id: 9, role: "DevOps Engineer", company: "IBM", location: "Chennai", experience: "2-4 Years" },
    { id: 10, role: "Machine Learning Expert", company: "Meta", location: "Bangalore", experience: "3-7 Years" },
    { id: 11, role: "React Native Developer", company: "Swiggy", location: "Bangalore", experience: "1-3 Years" },
    { id: 12, role: "Cybersecurity Analyst", company: "Wipro", location: "Mumbai", experience: "2-5 Years" },
    { id: 13, role: "Business Analyst", company: "Deloitte", location: "Gurugram", experience: "3-6 Years" },
    { id: 14, role: "Senior Java Developer", company: "Oracle", location: "Hyderabad", experience: "5-8 Years" },
    { id: 15, role: "iOS Developer", company: "Apple", location: "Bangalore", experience: "2-4 Years" },
    { id: 16, role: "Technical Writer", company: "Atlassian", location: "Remote", experience: "1-3 Years" },
    { id: 17, role: "Blockchain Developer", company: "CoinDCX", location: "Mumbai", experience: "3-5 Years" },
    { id: 18, role: "QA Engineer (Automation)", company: "Cognizant", location: "Chennai", experience: "2-4 Years" },
    { id: 19, role: "Cloud Security Engineer", company: "Palo Alto Networks", location: "Bangalore", experience: "4-7 Years" },
    { id: 20, role: "Growth Marketer", company: "Zepto", location: "Mumbai", experience: "1-4 Years" },
    { id: 21, role: "Engineering Manager", company: "Uber", location: "Bangalore", experience: "8+ Years" },
    { id: 22, role: "SEO Specialist", company: "MakeMyTrip", location: "Gurugram", experience: "2-5 Years" },
    { id: 23, role: "SRE (Site Reliability)", company: "LinkedIn", location: "Bangalore", experience: "3-6 Years" },
    { id: 24, role: "Data Engineer", company: "Flipkart", location: "Bangalore", experience: "2-5 Years" },
    { id: 25, role: "Flutter Developer", company: "Cred", location: "Bangalore", experience: "1-3 Years" },
    { id: 26, role: "Game Developer (Unity)", company: "Dream11", location: "Mumbai", experience: "2-4 Years" },
    { id: 27, role: "HR Executive", company: "Tech Mahindra", location: "Pune", experience: "Fresher" },
    { id: 28, role: "Network Administrator", company: "Cisco", location: "Bangalore", experience: "3-5 Years" },
    { id: 29, role: "AI Research Scientist", company: "OpenAI", location: "Remote", experience: "4-8 Years" },
    { id: 30, role: "Database Administrator", company: "Capgemini", location: "Noida", experience: "2-5 Years" }
];

let jobs = JSON.parse(localStorage.getItem("jobs")) || defaultJobs;

const jobCardList = document.getElementById("jobCardList");

function renderJobs(jobsToRender = jobs) {
    if (!jobCardList) return;
    jobCardList.innerHTML = "";

    if (jobsToRender.length === 0) {
        jobCardList.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 40px; color: #cbd5e1; margin-bottom: 15px;"></i>
                <h3>No jobs found!</h3>
                <p>Try adjusting your search criteria or looking for a different role/location.</p>
            </div>
        `;
        return;
    }

    jobsToRender.forEach(job => {
        const div = document.createElement("div");
        div.className = "job-card";
        div.innerHTML = `
            <h3>${job.role}</h3>
            <div class="company-name"><i class="fa-solid fa-building" style="margin-right: 8px;"></i>${job.company}</div>
            <div class="job-details">
                <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                <span><i class="fa-solid fa-briefcase"></i> ${job.experience}</span>
            </div>
            <div class="job-card-actions">
                <a href="applyJob.html" class="btn-apply">Apply Now</a>
                <button class="btn-edit" onclick="editJob(${job.id})">Edit</button>
                <button class="btn-delete" title="Delete Job" onclick="deleteJob(${job.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        jobCardList.appendChild(div);
    });
}

const postJobForm = document.getElementById("postJobForm");
if (postJobForm) {
    postJobForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const id = document.getElementById("jobId").value;
        const role = document.getElementById("jobRole").value;
        const company = document.getElementById("jobCompany").value;
        const location = document.getElementById("jobLocation").value;
        const experience = document.getElementById("jobExperience").value;

        if (id) {
            const index = jobs.findIndex(j => j.id == id);
            if (index !== -1) {
                jobs[index] = { id: parseInt(id), role, company, location, experience };
            }
        } else {
            const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
            jobs.push({ id: newId, role, company, location, experience });
        }

        localStorage.setItem("jobs", JSON.stringify(jobs));
        postJobForm.reset();
        document.getElementById("jobId").value = "";
        document.getElementById("submitJobBtn").innerText = "Post Job";
        renderJobs();
    });
}

window.editJob = function (id) {
    const job = jobs.find(j => j.id == id);
    if (!job) return;
    const postForm = document.getElementById("postJobForm");
    if (postForm) {
        document.getElementById("jobId").value = job.id;
        document.getElementById("jobRole").value = job.role;
        document.getElementById("jobCompany").value = job.company;
        document.getElementById("jobLocation").value = job.location;
        document.getElementById("jobExperience").value = job.experience;
        document.getElementById("submitJobBtn").innerText = "Update Job";
        document.getElementById("jobRole").focus();
        postForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert("Please navigate to the main Naukri page to edit jobs.");
    }
};

window.deleteJob = function (id) {
    if (confirm("Are you sure you want to delete this job?")) {
        jobs = jobs.filter(j => j.id != id);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        if (window.location.pathname.includes("search-jobs.html")) {
            searchFilter();
        } else {
            renderJobs();
        }
    }
};


document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("jobCardList") && !window.location.pathname.includes("search-jobs.html")) {
        renderJobs();
    }
});


const searchForm = document.getElementById("searchForm");

const searchFilter = function (e) {
    if (e) e.preventDefault();

    const skillInputElem = document.getElementById("searchSkill");
    const locationInputElem = document.getElementById("searchLocation");

    if (!skillInputElem || !locationInputElem) return;

    const skill = skillInputElem.value.toLowerCase().trim();
    const locationSearch = locationInputElem.value.toLowerCase().trim();

   
    const filteredJobs = jobs.filter(job => {
        const text = `${job.role} ${job.company}`.toLowerCase();
        const locText = job.location.toLowerCase();

        const matchesSkill = skill === "" || text.includes(skill);
        const matchesLocation = locationSearch === "" || locText.includes(locationSearch);

        return matchesSkill && matchesLocation;
    });

   
    const searchTitle = document.getElementById("searchTitle");
    if (searchTitle) {
        if (skill || locationSearch) {
            let titleText = "Results for ";
            if (skill) titleText += `"${skill}" `;
            if (skill && locationSearch) titleText += `in `;
            if (locationSearch) titleText += `"${locationSearch}"`;
            searchTitle.innerText = titleText;
        } else {
            searchTitle.innerText = "All Opening Jobs";
        }
    }

    renderJobs(filteredJobs);
};

if (searchForm) {
    const isSearchPage = window.location.pathname.includes("search-jobs.html");

    if (!isSearchPage) {
        
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const skill = document.getElementById("searchSkill").value.trim();
            const locationSearch = document.getElementById("searchLocation").value.trim();
            window.location.href = `search-jobs.html?skill=${encodeURIComponent(skill)}&location=${encodeURIComponent(locationSearch)}`;
        });
    } else {
       
        searchForm.addEventListener("submit", searchFilter);

        const skillInput = document.getElementById("searchSkill");
        const locationInput = document.getElementById("searchLocation");

        skillInput.addEventListener("input", searchFilter);
        locationInput.addEventListener("input", searchFilter);

        
        document.addEventListener("DOMContentLoaded", () => {
            const params = new URLSearchParams(window.location.search);
            const skillParam = params.get("skill");
            const locationParam = params.get("location");

            if (skillParam) skillInput.value = skillParam;
            if (locationParam) locationInput.value = locationParam;

            searchFilter(); 
        });
    }
}
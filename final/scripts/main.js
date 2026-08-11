import { getJobs } from './modules/fetchJobs.js';
import { initModal, openModal } from './modules/modal.js';
import { saveJob, getSavedJobs } from './modules/storage.js';

let allJobs = [];

document.addEventListener('DOMContentLoaded', async () => {
    initModal();
    allJobs = await getJobs();
    renderJobs(allJobs);
    setupFilterListeners();

    // Hamburger menu toggle for mobile view
    const hamburgerBtn = document.querySelector('#hamburger-btn');
    const navMenu = document.querySelector('#nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Set dynamic copyright year in footer
    document.querySelector('#year').textContent = new Date().getFullYear();
});

// Render cards using map & template literals
function renderJobs(jobs) {
    const container = document.querySelector('#job-container');
    const savedIds = getSavedJobs();

    if (jobs.length === 0) {
        container.innerHTML = '<p>No job listings found.</p>';
        return;
    }

    container.innerHTML = jobs.map(job => {
        const isSaved = savedIds.includes(job.id);
        return `
      <article class="job-card">
        <h3>${job.title}</h3>
        <p class="company">${job.company}</p>
        <p class="location">📍 ${job.location} • ${job.type}</p>
        <p class="salary">💰 ${job.salary}</p>
        <div class="card-buttons">
          <button class="details-btn" data-id="${job.id}">View Details</button>
          <button class="save-btn" data-id="${job.id}">
            ${isSaved ? '★ Saved' : '☆ Save Job'}
          </button>
        </div>
      </article>
    `;
    }).join('');

    attachCardEvents();
}


function attachCardEvents() {
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const jobId = e.target.dataset.id;
            const job = allJobs.find(j => j.id === jobId);
            if (job) openModal(job);
        });
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const jobId = e.target.dataset.id;
            saveJob(jobId);
            e.target.textContent = '★ Saved';
        });
    });
}

// Filter jobs by work location (Remote, Hybrid, On-site)
function setupFilterListeners() {
    const filterSelect = document.querySelector('#filter-location');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            if (value === 'all') {
                renderJobs(allJobs);
            } else {
                const filtered = allJobs.filter(job => job.location.toLowerCase() === value.toLowerCase());
                renderJobs(filtered);
            }
        });
    }
}
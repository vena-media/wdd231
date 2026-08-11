import { getJobs } from './modules/fetchJobs.js';
import { initModal, openModal } from './modules/modal.js';
import { getSavedJobs, removeSavedJob } from './modules/storage.js';

let allJobs = [];

document.addEventListener('DOMContentLoaded', async () => {
    initModal();
    setupHamburger();

    // 1. Fetch all jobs from jobs.json
    allJobs = await getJobs();

    // 2. Render only saved ones
    renderSavedJobs();
});

function renderSavedJobs() {
    const container = document.querySelector('#saved-container');
    if (!container) return;

    const savedIds = getSavedJobs();

    // Filter all jobs against saved IDs in localStorage
    const savedJobs = allJobs.filter(job => savedIds.includes(job.id));

    if (savedJobs.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No saved jobs yet! Return to the Jobs page to save positions.</p>';
        return;
    }

    container.innerHTML = savedJobs.map(job => `
    <article class="job-card">
      <h2>${job.title}</h2>
      <p class="company">${job.company}</p>
      <p class="location">📍 ${job.location} • ${job.type}</p>
      <p class="salary">💰 ${job.salary}</p>
      <div class="card-buttons">
        <button class="details-btn" data-id="${job.id}">View Details</button>
        <button class="remove-btn" data-id="${job.id}">Remove</button>
      </div>
    </article>
  `).join('');

    attachSavedEvents();
}

function attachSavedEvents() {
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const jobId = e.target.dataset.id;
            const job = allJobs.find(j => j.id === jobId);
            if (job) openModal(job);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const jobId = e.target.dataset.id;
            removeSavedJob(jobId);
            renderSavedJobs(); // re-render after removal
        });
    });
}

function setupHamburger() {
    const btn = document.querySelector('#hamburger-btn');
    const nav = document.querySelector('#nav-menu');
    if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));

    const yearEl = document.querySelector('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}
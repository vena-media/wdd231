const STORAGE_KEY = 'devhub_saved_jobs';

export function getSavedJobs() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
}

export function saveJob(jobId) {
    const saved = getSavedJobs();
    if (!saved.includes(jobId)) {
        saved.push(jobId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
}

export function removeSavedJob(jobId) {
    let saved = getSavedJobs();
    saved = saved.filter(id => id !== jobId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}
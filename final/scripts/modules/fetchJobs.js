// Fetch jobs data using try...catch
export async function getJobs() {
    const url = './data/jobs.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching job listings:', error);
        return [];
    }
}
export function initModal() {
    const modal = document.querySelector('#job-modal');
    const closeModalBtn = document.querySelector('#close-modal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    // Close modal when clicking on backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}

export function openModal(job) {
    const modal = document.querySelector('#job-modal');
    const modalBody = document.querySelector('#modal-body');

    modalBody.innerHTML = `
    <h2>${job.title}</h2>
    <p><strong>Company:</strong> ${job.company}</p>
    <p><strong>Location:</strong> ${job.location} (${job.type})</p>
    <p><strong>Salary:</strong> ${job.salary}</p>
    <hr>
    <p>${job.description}</p>
  `;

    modal.showModal();
}
document.addEventListener('DOMContentLoaded', () => {
    setupHamburger();

    const container = document.querySelector('#response-container');
    const params = new URLSearchParams(window.location.search);

    if (!params.has('fullname')) {
        container.innerHTML = '<p>No form data found. Please submit the form on the Post/Apply page.</p>';
        return;
    }

    const fullname = params.get('fullname') || 'N/A';
    const email = params.get('email') || 'N/A';
    const type = params.get('type') || 'N/A';
    const title = params.get('title') || 'N/A';
    const notes = params.get('notes') || 'N/A';

    container.innerHTML = `
    <h3>Submitted Details</h3>
    <p><strong>Name / Company:</strong> ${fullname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Type:</strong> ${type}</p>
    <p><strong>Title / Skill:</strong> ${title}</p>
    <p><strong>Notes:</strong> ${notes}</p>
    <br>
    <a href="index.html" class="submit-btn" style="text-decoration:none; display:inline-block; text-align:center;">Back to Home</a>
  `;
});

function setupHamburger() {
    const btn = document.querySelector('#hamburger-btn');
    const nav = document.querySelector('#nav-menu');
    if (btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));
    document.querySelector('#year').textContent = new Date().getFullYear();
}
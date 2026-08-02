const url = 'data/members.json';
const container = document.getElementById('directory-container');
const gridBtn = document.getElementById('view-grid');
const listBtn = document.getElementById('view-list');
// 1. Fetch JSON Member Data
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error('Error fetching member data:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// 2. Render Cards into HTML Container
function displayMembers(members) {
    container.innerHTML = ''; // Clear existing contents

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        let levelText = 'Member';
        if (member.membership === 2) levelText = 'Silver';
        if (member.membership === 3) levelText = 'Gold';

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="membership-tier"><strong>Tier:</strong> ${levelText}</p>
                <p>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${member.address}
                </p>
                <p>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    ${member.phone}
                </p>
                <p>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Grid vs. List View Toggle Events
gridBtn.addEventListener('click', () => {
    container.classList.add('grid-layout');
    container.classList.remove('list-layout');
    gridBtn.classList.add('active-btn');
    listBtn.classList.remove('active-btn');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-layout');
    container.classList.remove('grid-layout');
    listBtn.classList.add('active-btn');
    gridBtn.classList.remove('active-btn');
});



// 4. Dynamic Footer Dates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Run initial fetch
getMembers();